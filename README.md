# 🥂 AZARAR - Social Dating & Real-Time Proximity App

<div align="center">
  <img src="app/assets/images/logo.png" alt="Azarar Logo" width="180" />
  <br />
  <strong>O Híbrido de Tinder + Instagram com Proximidade Real, Biometria Facial e Conexões Instantâneas.</strong>
  <br /><br />
  
  ![Ruby](https://img.shields.io/badge/Ruby-3.3.8-CC342D?style=for-the-badge&logo=ruby&logoColor=white)
  ![Rails](https://img.shields.io/badge/Rails-8.1-CC0000?style=for-the-badge&logo=rubyonrails&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Nginx](https://img.shields.io/badge/Nginx-1.28-009639?style=for-the-badge&logo=nginx&logoColor=white)
  ![SSL](https://img.shields.io/badge/SSL-Let's%20Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
  ![Production](https://img.shields.io/badge/Status-Online%20(Production)-22c55e?style=for-the-badge)

  <br />
  🌐 **Domínio Oficial de Produção:** [https://azarar.com.br](https://azarar.com.br)
</div>

---

## 📖 1. Sobre o Projeto

O **AZARAR** é uma plataforma moderna desenvolvida para transformar a forma como as pessoas se conectam em ambientes sociais da vida real (baladas, lounges, bares, cafés, festivais e eventos universitários). Em vez de esperar dias por respostas em aplicativos tradicionais, o Azarar incentiva interações espontâneas imediatas com quem está fisicamente perto de você.

### 🌟 Principais Funcionalidades

1. **🛰️ Geolocalização GPS Real & Radar de Proximidade (5m a 2km):**
   * Captura coordenadas de alta precisão (`navigator.geolocation`).
   * Seletor deslizante neon (*Range Slider*) interativo que filtra pessoas em tempo real de **5 metros** (mesma mesa/ambiente) até **2 quilômetros** (bairro/região).
   * Cálculo de distância por satélite via fórmula de Haversine com a gem `geocoder`.

2. **🛡️ Biometria Facial com Selo Azul de Verificação (Face ID):**
   * HUD biométrico com scanner laser animado em tempo real via câmera do celular ou webcam.
   * Validação de autenticidade (anti-catfish) com pontuação de similaridade e emissão de selo azul oficial (`profVerifiedBadge`).
   * **Login Facial em 1 Clique:** Reconhecimento facial inteligente que autentica a conta sem exigir digitação de usuário ou senha.

3. **🥂 Dinâmica de Brinde Mútuo & Celebração:**
   * Envie um brinde para pessoas que você avistou no local.
   * Se a pessoa retribuir o brinde, uma tela de celebração mútua é acionada com efeitos sonoros e vibração tátil.

4. **⏳ Chat Efêmero 1-on-1 com Timer de 3 Horas:**
   * Conversas privadas temporárias com contagem regressiva para incentivar o encontro presencial antes do término da noite.
   * Quebra-gelos instantâneos (*Icebreakers*) de um toque.

5. **📢 Mural Aberto de Proximidade:**
   * Feed público de recados e avisos onde todas as pessoas dentro do raio selecionado podem interagir e comentar.

6. **📱 Interface Mobile-First Cyber-Glassmorphism (100dvh):**
   * Totalmente responsiva e adaptada para telas de iPhone e Android com suporte a áreas seguras (*Safe Area Insets* do iOS/Safari) e instalação PWA.

---

## 🏗️ 2. Arquitetura e Tecnologias

* **Backend:** [Ruby on Rails 8.1](https://rubyonrails.org/) em modo API + SSR híbrido.
* **Linguagem:** Ruby 3.3.8 LTS.
* **Banco de Dados:** SQLite3 configurado em modo WAL de alta performance e concorrência.
* **Background Jobs & WebSockets:** Rails Solid Suite (`Solid Queue`, `Solid Cable`, `Solid Cache`).
* **Geolocalização:** Gem `geocoder 1.8.6` com cálculos esféricos de Haversine.
* **Frontend:** Vanilla JavaScript modularizado e reativo + CSS3 Moderno (Glassmorphism, Flexbox/Grid, Variáveis CSS, TailwindCSS v4).
* **Servidor Web:** [Nginx 1.28](https://nginx.org/) com proxy reverso, HTTP/2, compressão Gzip e WebSockets.
* **Servidor de Aplicação:** [Puma 8.0](https://puma.io/) gerenciado como serviço do Linux Systemd.
* **Segurança & SSL:** Certificado TLS/HTTPS gratuito com renovação automática via [Certbot (Let's Encrypt)](https://letsencrypt.org/).

---

## 📂 3. Estrutura do Repositório

```plaintext
azarar/
├── app/
│   ├── assets/              # Folhas de estilo (style.css, tailwind) e imagens
│   ├── controllers/         # Controllers Rails (Autenticação, Face ID, GPS, Mural, Chat)
│   ├── models/              # Modelos ActiveRecord (User, Post, MuralMessage, DirectMessage)
│   ├── services/            # Serviços especializados (FaceRecognitionService)
│   └── views/               # Views ERB (Layout principal e App Shell SPA)
├── config/
│   ├── environments/        # Configurações de desenvolvimento e produção
│   ├── database.yml         # Configurações do SQLite3 / Solid Suite
│   └── routes.rb            # Rotas da aplicação e endpoints de API
├── db/
│   ├── migrate/             # Migrações do banco de dados
│   └── seeds.rb             # Dados iniciais para testes de desenvolvimento
├── public/
│   ├── css/style.css        # CSS compilado e otimizado da interface
│   └── js/app.js            # Lógica completa da aplicação (SPA Controller)
├── script/                  # Scripts de automação, testes e deploy da VPS
│   ├── deploy_app.sh        # Script inicial de deploy na VPS
│   ├── deploy_vps_git.sh    # Script de deploy em 1 clique via Git (/root/deploy.sh)
│   ├── enable_ssl.sh        # Automação de certificado SSL Certbot
│   ├── setup_vps.sh         # Instalação completa do ambiente na VPS do zero
│   └── test_location.rb     # Script de teste de cálculo de distância GPS
└── README.md
```

---

## 🛠️ 4. Como Rodar o Projeto Localmente

### Pré-requisitos:
* **Ruby:** Versão `3.3.x`
* **Node.js:** Versão `22.x`
* **Bundler & SQLite3**

### Passo a passo:

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:luisarlindo/Azarar.git
   cd Azarar
   ```

2. **Instale as dependências:**
   ```bash
   bundle install
   ```

3. **Prepare o banco de dados e dados iniciais:**
   ```bash
   bin/rails db:prepare
   bin/rails db:seed
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   bin/dev
   # Ou: bin/rails server -p 3000
   ```

5. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000)

---

## 🚀 5. Deploy em Produção (VPS)

O projeto está configurado para deploy contínuo em 1 comando na VPS Ubuntu:

### 🔄 Fluxo de Deploy Rápido:

1. Faça suas alterações localmente e envie para o GitHub:
   ```bash
   git add .
   git commit -m "feat: minha nova melhoria"
   git push origin main
   ```

2. Acesse a VPS via SSH e execute o script de deploy:
   ```bash
   bash /root/deploy.sh
   ```

### ⚙️ O que o script de deploy faz automaticamente:
1. Puxa as últimas atualizações do repositório (`git pull origin main`).
2. Instala e atualiza gems do Ruby (`bundle install`).
3. Executa as novas migrações do banco de dados (`db:migrate`).
4. Compila e minifica todos os assets de CSS/JS (`assets:precompile`).
5. Reinicia o serviço do **Puma** no Systemd com zero perda de dados.

---

## 🔒 6. Gerenciamento do Serviço e SSL

* **Verificar status do servidor:**
  ```bash
  systemctl status azarar
  ```
* **Ver logs em tempo real:**
  ```bash
  journalctl -u azarar -f
  ```
* **Renovação de Certificado SSL (HTTPS):**
  ```bash
  bash /root/enable_ssl.sh
  ```

---

## 📄 Licença

Projeto proprietário desenvolvido por **Luis Arlindo**. Todos os direitos reservados.
