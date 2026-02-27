#!/bin/bash

# AWS EC2 Deployment Script for Uber Clone
# Run this on your EC2 instance: ubuntu@50.17.59.55

set -e  # Exit on any error

echo "🚀 Starting Uber Clone deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    sudo apt install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "⚠️  Please logout and login again for Docker permissions to take effect"
fi

# Install Docker Compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create deployment directory
DEPLOY_DIR="$HOME/uber-clone"
echo "📁 Creating deployment directory: $DEPLOY_DIR"
mkdir -p $DEPLOY_DIR

# Navigate to deployment directory
cd $DEPLOY_DIR

echo "✅ Setup complete! Now you can upload your project files."
echo ""
echo "Next steps:"
echo "1. Upload your project files to: $DEPLOY_DIR"
echo "2. Run: docker-compose -f docker-compose.prod.yml up --build -d"
echo "3. Your app will be available at: http://50.17.59.55:8080"
echo ""
echo "Port usage:"
echo "- Frontend: 8080 (external) -> 80 (internal)"
echo "- Backend: 4001 (external) -> 4000 (internal)"
echo "- MongoDB: 27018 (external) -> 27017 (internal)"