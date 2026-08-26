#!/usr/bin/env bash
set -e

echo "=== ISSUING SSL CERTIFICATE FOR AZARAR.COM.BR ==="
certbot --nginx -d azarar.com.br -d www.azarar.com.br --non-interactive --agree-tos --email admin@azarar.com.br --redirect
systemctl reload nginx
echo "=== SSL ACTIVATED SUCCESSFULLY ==="
