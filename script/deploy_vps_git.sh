#!/usr/bin/env bash
set -e

echo "=== INICIANDO DEPLOY DO AZARAR NA VPS ==="
git config --global --add safe.directory /var/www/azarar || true
cd /var/www/azarar

# 1. Puxar últimas alterações do GitHub
echo "1. Puxando atualizações do GitHub (git pull origin main)..."
git fetch origin
git reset --hard origin/main

# 2. Instalar novas gems (se houver)
echo "2. Verificando dependências do Ruby..."
bundle install

# 3. Executar migrações do banco
echo "3. Executando migrações do banco de dados..."
RAILS_ENV=production bin/rails db:migrate

# 4. Pré-compilar assets (CSS/JS/Tailwind)
echo "4. Compilando assets de produção..."
RAILS_ENV=production bin/rails assets:precompile

# 5. Reiniciar o servidor Puma
echo "5. Reiniciando o serviço do Azarar..."
systemctl restart azarar

sleep 2
systemctl status azarar --no-pager

echo "=== DEPLOY CONCLUÍDO COM SUCESSO! ==="
