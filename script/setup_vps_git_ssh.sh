#!/usr/bin/env bash
set -e

mkdir -p /root/.ssh
chmod 700 /root/.ssh

if [ ! -f /root/.ssh/id_ed25519 ]; then
  ssh-keygen -t ed25519 -C "vps-deploy@azarar.com.br" -f /root/.ssh/id_ed25519 -N ""
fi

cat << 'EOF' > /root/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile /root/.ssh/id_ed25519
  AddKeysToAgent yes
  StrictHostKeyChecking accept-new
EOF
chmod 600 /root/.ssh/config

# Configure Git inside /var/www/azarar
cd /var/www/azarar
if [ ! -d .git ]; then
  git init -b main
  git remote add origin git@github.com:luisarlindo/Azarar.git || true
else
  git remote set-url origin git@github.com:luisarlindo/Azarar.git || true
fi

echo "=== VPS_SSH_PUBLIC_KEY_START ==="
cat /root/.ssh/id_ed25519.pub
echo "=== VPS_SSH_PUBLIC_KEY_END ==="
