#!/usr/bin/env bash
set -e

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
ExecStart=/usr/local/bin/bundle exec puma -C config/puma.rb -e production -p 3000
Restart=always
RestartSec=3
StandardOutput=append:/var/www/azarar/log/production.log
StandardError=append:/var/www/azarar/log/production_error.log

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable azarar
systemctl restart azarar

sleep 3
systemctl status azarar --no-pager
