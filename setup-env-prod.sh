#!/bin/bash

# Production Environment Setup Script
# Run this on your EC2 instance before deploying

echo "🔧 Setting up production environment variables..."

# Generate a strong JWT secret
JWT_SECRET=$(openssl rand -hex 32)

# Create backend .env file
cat > Backend/.env << EOF
PORT=4000
DB_CONNECT=mongodb://mongo:27017/uber
JWT_SECRET=${JWT_SECRET}
EOF

# Create frontend .env file
cat > frontend/.env << EOF
VITE_BASE_URL=http://50.17.59.55:8080
EOF

echo "✅ Environment files created successfully!"
echo "🔐 JWT Secret: ${JWT_SECRET}"
echo ""
echo "Next: Run 'docker-compose -f docker-compose.prod.yml up --build -d'"