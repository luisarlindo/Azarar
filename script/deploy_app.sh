#!/usr/bin/env bash
set -e

echo "=== DEPLOYING AZARAR ON VPS ==="
cd /var/www/azarar

# 1. Setup Environment & Secret Key Base
if [ ! -f .env ]; then
  SECRET_KEY=$(ruby -e "require 'securerandom'; puts SecureRandom.hex(64)")
  echo "SECRET_KEY_BASE=${SECRET_KEY}" > .env
  echo "RAILS_ENV=production" >> .env
  echo "PORT=3000" >> .env
  echo "RAILS_SERVE_STATIC_FILES=true" >> .env
fi

# 2. Bundle install
echo "Installing gems..."
bundle install

# 3. Database prepare & migrations
echo "Running database migrations..."
RAILS_ENV=production bin/rails db:prepare

# 4. Precompile assets
echo "Precompiling assets..."
RAILS_ENV=production bin/rails assets:precompile

# 5. Create Systemd Service
echo "Configuring Systemd service..."
cat << 'EOF' > /etc/systemd/system/azarar.service
[Unit]
Description=Azarar Rails 8 Production Web Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/azarar
Environment=RAILS_ENV=production
Environment=PORT=3000
Environment=RAILS_SERVE_STATIC_FILES=true
Environment=RAILS_LOG_TO_STDOUT=true
Environment=SOLID_QUEUE_IN_PUMA=true
EnvironmentFile=/var/www/azarar/.env
ExecStart=/usr/bin/bundle exec puma -C config/puma.rb -e production -p 3000
Restart=always
RestartSec=3
StandardOutput=append:/var/www/azarar/log/production.log
StandardError=append:/var/www/azarar/log/production_error.log

[Install]
WantedBy=multi-user.target
EOF

# 6. Configure Nginx
echo "Configuring Nginx..."
cat << 'EOF' > /etc/nginx/sites-available/azarar
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name azarar.com.br www.azarar.com.br 162.35.112.143;

    root /var/www/azarar/public;
    client_max_body_size 30M;

    location / {
        try_files $uri @puma;
    }

    location @puma {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 120s;
    }

    location ~ ^/(assets|css|js|images)/ {
        gzip_static on;
        expires max;
        add_header Cache-Control public;
        try_files $uri =404;
    }
}
EOF

# Enable Nginx Site
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/azarar /etc/nginx/sites-enabled/azarar
nginx -t
systemctl reload nginx

# 7. Start and enable Azarar Service
echo "Starting Azarar production service..."
systemctl daemon-reload
systemctl enable azarar
systemctl restart azarar

sleep 4
systemctl status azarar --no-pager

echo "=== DEPLOYMENT COMPLETED SUCCESSFULLY ==="
