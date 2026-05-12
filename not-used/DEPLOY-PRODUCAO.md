# 🚀 Guia de Deploy - Produção (mautone.com.br)

## Passo a Passo Completo

### 1️⃣ Preparar o Frontend

```bash
# Navegar para a pasta do projeto
cd /www/wwwroot/mautone

# Fazer build do frontend
npm run build

# Verificar se a pasta dist foi criada
ls -la dist/
```

**Resultado esperado:** Pasta `dist/` com `index.html` e `assets/`

---

### 2️⃣ Preparar o Backend

```bash
# Navegar para a pasta do backend
cd /www/wwwroot/mautone/backend

# Verificar se o arquivo .env existe
ls -la .env

# Verificar se PORT=3011 está configurado
cat .env | grep PORT
```

**Se não existir ou estiver errado:**
```bash
# Criar/editar .env
nano .env
```

**Conteúdo do .env:**
```env
PORT=3011
FRONTEND_URL=https://mautone.com.br

# Mailgun Configuration
MAILGUN_API_KEY=sua-api-key
MAILGUN_DOMAIN=seu-dominio.mailgun.org
MAILGUN_FROM_EMAIL=noreply@mautone.com.br
MAILGUN_TO_EMAIL=contato@mautone.com.br
CONTACT_EMAIL=contato@mautone.com.br
```

```bash
# Fazer build do backend
npm run build

# Verificar se dist/server.js foi criado
ls -la dist/server.js
```

---

### 3️⃣ Iniciar o Backend com PM2

```bash
# Verificar se PM2 está instalado
pm2 --version

# Se não estiver, instalar:
npm install -g pm2

# Parar processos antigos (se houver)
pm2 stop mautone-backend
pm2 delete mautone-backend

# Iniciar o backend
cd /www/wwwroot/mautone/backend
pm2 start dist/server.js --name mautone-backend

# Verificar se está rodando
pm2 list
pm2 logs mautone-backend

# Salvar configuração do PM2
pm2 save
pm2 startup  # Seguir as instruções se aparecer
```

**Verificar se o backend está respondendo:**
```bash
curl http://127.0.0.1:3011/health
```

**Deve retornar JSON:**
```json
{"status":"ok","message":"Server is running",...}
```

---

### 4️⃣ Configurar o Nginx

```bash
# Fazer backup da configuração atual
sudo cp /www/server/panel/vhost/nginx/mautone.com.br.conf /www/server/panel/vhost/nginx/mautone.com.br.conf.backup

# Editar o arquivo de configuração
sudo nano /www/server/panel/vhost/nginx/mautone.com.br.conf
```

**Substituir TODO o conteúdo pelo seguinte:**

```nginx
server
{
    listen 80;
    listen 443 ssl;
    server_name mautone.com.br;
    index index.html index.htm default.htm default.html;
    
    # IMPORTANTE: Pasta do frontend (build do React/Vite)
    root /www/wwwroot/mautone/dist;
    
    #SSL-START SSL related configuration
    ssl_certificate    /www/server/panel/vhost/cert/mautone/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/mautone/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;
    
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    #SSL-END
    
    #ERROR-PAGE-START  Error page configuration, allowed to be commented
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #Files or directories forbidden to access
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md|package.json|package-lock.json|\.env|node_modules) {
        return 404;
    }
    
    #One-click application for SSL certificate verification directory related settings
    location /.well-known/ {
        root  /www/wwwroot/mautone/backend/;
    }

    #REWRITE-START Pseudo-static related configuration
    include /www/server/panel/vhost/rewrite/node_mautone.conf;
    #REWRITE-END

    # HTTP reverse proxy related settings begin >>>
    location ~ /purge(/.*) {
        proxy_cache_purge cache_one $host$request_uri$is_args$args;
    }

    # API Backend - Proxy reverso para Node.js (APENAS /api)
    location /api {
        proxy_pass http://127.0.0.1:3011;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header REMOTE-HOST $remote_addr;
        add_header X-Cache $upstream_cache_status;
        
        proxy_connect_timeout 30s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 30s;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    # End of HTTP reverse proxy related settings <<<

    # Frontend - Servir arquivos estáticos do React/Vite
    location / {
        # Tentar servir arquivo, se não existir, servir index.html (SPA routing)
        try_files $uri $uri/ /index.html;
        
        # Cache para assets estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    access_log  /www/wwwlogs/mautone.log;
    error_log  /www/wwwlogs/mautone.error.log;
}
```

**Salvar e sair:** `Ctrl+X`, depois `Y`, depois `Enter`

---

### 5️⃣ Testar e Aplicar Configuração do Nginx

```bash
# Testar se a configuração está correta
sudo nginx -t
```

**Se aparecer "syntax is ok" e "test is successful":**

```bash
# Recarregar o Nginx
sudo systemctl reload nginx
# ou
sudo service nginx reload
```

**Se der erro, verificar o arquivo novamente:**
```bash
sudo nano /www/server/panel/vhost/nginx/mautone.com.br.conf
```

---

### 6️⃣ Verificar se Está Funcionando

```bash
# 1. Verificar se o backend está rodando
curl http://127.0.0.1:3011/health

# 2. Verificar se a API responde através do Nginx
curl https://mautone.com.br/api/health

# 3. Verificar se o frontend está sendo servido
curl https://mautone.com.br/
```

**Resultados esperados:**
- `curl http://127.0.0.1:3011/health` → JSON com `{"status":"ok",...}`
- `curl https://mautone.com.br/api/health` → Mesmo JSON
- `curl https://mautone.com.br/` → HTML do `index.html`

---

### 7️⃣ Verificar Logs (se houver problemas)

```bash
# Logs do Nginx
sudo tail -f /www/wwwlogs/mautone.error.log

# Logs do backend
pm2 logs mautone-backend

# Status do PM2
pm2 status
```

---

## ✅ Checklist Final

- [ ] Frontend foi feito build (`npm run build` na raiz)
- [ ] Pasta `/www/wwwroot/mautone/dist` existe e tem `index.html`
- [ ] Backend foi feito build (`npm run build` no backend)
- [ ] Arquivo `.env` existe em `/www/wwwroot/mautone/backend/.env` com `PORT=3011`
- [ ] Backend está rodando com PM2 (`pm2 list` mostra `mautone-backend`)
- [ ] `curl http://127.0.0.1:3011/health` retorna JSON
- [ ] Nginx foi configurado corretamente
- [ ] `sudo nginx -t` passou sem erros
- [ ] Nginx foi recarregado (`sudo systemctl reload nginx`)
- [ ] `curl https://mautone.com.br/` retorna HTML
- [ ] `curl https://mautone.com.br/api/health` retorna JSON

---

## 🔧 Comandos Rápidos de Manutenção

```bash
# Reiniciar backend
pm2 restart mautone-backend

# Ver logs do backend
pm2 logs mautone-backend

# Rebuild frontend
cd /www/wwwroot/mautone && npm run build

# Rebuild backend
cd /www/wwwroot/mautone/backend && npm run build && pm2 restart mautone-backend

# Verificar processos
pm2 list
lsof -i :3011

# Recarregar Nginx
sudo systemctl reload nginx
```

---

## ⚠️ Problemas Comuns

### Erro: "Cannot GET"
- **Causa:** Nginx não está servindo arquivos estáticos ou está fazendo proxy de tudo
- **Solução:** Verificar se `root /www/wwwroot/mautone/dist;` está configurado e se `location /` usa `try_files`

### Erro: "502 Bad Gateway"
- **Causa:** Backend não está rodando na porta 3011
- **Solução:** `pm2 list` e `pm2 start dist/server.js --name mautone-backend`

### Erro: "Port 3011 already in use"
- **Causa:** Outro processo está usando a porta
- **Solução:** `lsof -i :3011` e matar o processo, ou mudar a porta no `.env`

---

## 📝 Estrutura Final Esperada

```
/www/wwwroot/mautone/
├── dist/                    ← Frontend (servido pelo Nginx)
│   ├── index.html
│   └── assets/
├── backend/
│   ├── dist/
│   │   └── server.js       ← Backend (porta 3011, PM2)
│   └── .env
└── ...
```

**Nginx:** Serve `dist/` e faz proxy de `/api` para `http://127.0.0.1:3011`
