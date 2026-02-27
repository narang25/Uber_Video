const axios = require('axios');
const http = require('http');
const https = require('https');
const captainModel = require('../models/captain.model');

// Force IPv4 to avoid Docker IPv6 connectivity issues
const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

// ---- In-memory cache ----
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCached(key) {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.time < CACHE_TTL) {
        return entry.data;
    }
    cache.delete(key);
    return null;
}

function setCache(key, data) {
    cache.set(key, { data, time: Date.now() });
    if (cache.size > 500) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
    }
}

// ---- Helper: cached GET request (forced IPv4) ----
async function cachedGet(url) {
    const cached = getCached(url);
    if (cached) return { data: cached };

    const response = await axios.get(url, {
        headers: { 'User-Agent': 'UberCloneApp/1.0' },
        timeout: 10000,
        httpAgent,
        httpsAgent
    });
    setCache(url, response.data);
    return response;
}

// ---- Geocoding: address -> coordinates (using Photon by Komoot - free, no key) ----
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;

    try {
        const response = await cachedGet(url);
        if (response.data.features && response.data.features.length > 0) {
            const coords = response.data.features[0].geometry.coordinates;
            return {
                ltd: coords[1], // latitude
                lng: coords[0]  // longitude
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
}

// ---- Distance & Duration: using OSRM (free, no key) ----
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);

        // OSRM uses lng,lat format
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;

        const response = await cachedGet(osrmUrl);

        if (response.data.code === 'Ok' && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                distance: {
                    text: (route.distance / 1000).toFixed(1) + ' km',
                    value: route.distance // in meters
                },
                duration: {
                    text: Math.round(route.duration / 60) + ' mins',
                    value: route.duration // in seconds
                }
            };
        } else {
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error('Distance/time error:', err.message);
        throw err;
    }
}

// ---- Autocomplete suggestions (using Photon by Komoot - free, no key) ----
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

    try {
        const response = await cachedGet(url);
        if (response.data.features && response.data.features.length > 0) {
            return response.data.features.map(feature => {
                const p = feature.properties;
                // Build a readable address string from Photon properties
                const parts = [p.name, p.street, p.city, p.state, p.country].filter(Boolean);
                return [...new Set(parts)].join(', ');
            }).filter(value => value);
        } else {
            return [];
        }
    } catch (err) {
        console.error('Autocomplete error:', err.message);
        return [];
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}