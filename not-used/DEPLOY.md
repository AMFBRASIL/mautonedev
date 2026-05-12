# 🚀 Guia de Deploy - Produção

## Estrutura do Projeto

```
backend/
├── src/              ← Código fonte (TypeScript)
├── dist/             ← Código compilado (JavaScript) - GERADO após build
├── node_modules/     ← Dependências
├── .env              ← Variáveis de ambiente (NÃO commitado)
└── package.json
```

## Opções de Deploy

### Opção 1: Usando PM2 (Recomendado)

PM2 é um gerenciador de processos para Node.js que mantém sua aplicação rodando.

```bash
# 1. Instalar PM2 globalmente
npm install -g pm2

# 2. Navegar para a pasta do backend
cd /www/wwwroot/mautone/backend

# 3. Fazer o build
npm run build

# 4. Iniciar com PM2
pm2 start dist/server.js --name mautone-backend

# 5. Salvar configuração do PM2
pm2 save
pm2 startup  # Seguir as instruções para iniciar no boot
```

**Comandos úteis do PM2:**
```bash
pm2 list              # Ver processos rodando
pm2 logs mautone-backend  # Ver logs
pm2 restart mautone-backend  # Reiniciar
pm2 stop mautone-backend     # Parar
pm2 delete mautone-backend   # Remover
```

### Opção 2: Usando npm start diretamente

```bash
cd /www/wwwroot/mautone/backend
npm run build
npm start
```

⚠️ **Nota:** Este método não mantém o processo rodando se você fechar o terminal. Use PM2 para produção.

### Opção 3: Usando systemd (Linux)

Criar um serviço systemd:

```bash
sudo nano /etc/systemd/system/mautone-backend.service
```

Conteúdo do arquivo:
```ini
[Unit]
Description=Mautone Backend API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/www/wwwroot/mautone/backend
ExecStart=/usr/bin/node /www/wwwroot/mautone/backend/dist/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Ativar o serviço:
```bash
sudo systemctl daemon-reload
sudo systemctl enable mautone-backend
sudo systemctl start mautone-backend
sudo systemctl status mautone-backend
```

## Configuração do Nginx (Proxy Reverso)

### Opção 1: API em subdomínio (api.mautone.com.br)

Se você quer separar a API em um subdomínio:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.mautone.com.br;

    # Redirecionar HTTP para HTTPS (se tiver SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3011;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Opção 2: API no mesmo domínio (mautone.com.br/api) - RECOMENDADO

Se você quer a API no mesmo domínio, mas em `/api`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mautone.com.br www.mautone.com.br;

    root /www/wwwroot/mautone/dist;  # Pasta do build do frontend
    index index.html;

    # API Backend - proxy reverso para Node.js
    location /api {
        proxy_pass http://localhost:3011;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend - arquivos estáticos do React/Vite
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Importante:** 
- O Nginx aponta para `http://localhost:3011` (onde o Node.js está rodando), NÃO para a pasta `dist/`.
- O frontend deve estar na pasta `/www/wwwroot/mautone/dist` (resultado do `npm run build` do frontend).
- Após configurar, execute: `sudo nginx -t && sudo systemctl reload nginx`

### Verificar configuração do Nginx

```bash
# Testar configuração
sudo nginx -t

# Verificar se está apontando para a porta correta (3011, não 3001!)
sudo grep -r "3011\|3001" /etc/nginx/

# Recarregar Nginx
sudo systemctl reload nginx
```

## Configuração da Porta

A porta é configurada no arquivo `.env`:

```env
PORT=3011
```

Se não definir, o padrão será 3011. **Configure sempre no `.env` para produção!**

## Resumo

- **PM2/systemd:** Executa `node dist/server.js` (o arquivo compilado)
- **Nginx/Apache:** Aponta para `http://localhost:3011` (a porta onde o Node.js está rodando)
- **NÃO precisa:** Apontar diretamente para a pasta `dist/` no servidor web

O servidor Node.js está configurado para rodar na porta definida no `.env` (padrão: 3011).
