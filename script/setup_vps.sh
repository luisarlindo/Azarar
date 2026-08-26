#!/usr/bin/env bash
set -e

echo "========================================================="
echo "   AZARAR - PRODUCTION VPS SETUP & DEPLOYMENT SCRIPT     "
echo "========================================================="

# 1. Update and install base packages
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y \
  build-essential \
  ruby \
  ruby-dev \
  libyaml-dev \
  libsqlite3-dev \
  sqlite3 \
  libvips42 \
  libssl-dev \
  pkg-config \
  curl \
  git \
  nginx \
  certbot \
  python3-certbot-nginx \
  ufw \
  rsync

# 2. Configure Firewall (UFW)
echo "Configuring firewall..."
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

# 3. Install Bundler
echo "Installing Bundler..."
gem install bundler --no-document

# 4. Create App Directory
mkdir -p /var/www/azarar
mkdir -p /var/www/azarar/tmp/pids
mkdir -p /var/www/azarar/tmp/sockets
mkdir -p /var/www/azarar/log
mkdir -p /var/www/azarar/storage

echo "VPS Base environment setup completed successfully!"
