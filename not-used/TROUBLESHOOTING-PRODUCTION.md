# 🔧 Troubleshooting - Produção (mautone.com.br)

## Erro: "Cannot GET" no domínio mautone.com.br

### Problema
Ao acessar `https://mautone.com.br` ou `https://mautone.com.br/api`, você recebe:
```
Cannot GET /
```

### Diagnóstico Passo a Passo

#### 1. Verificar se o servidor Node.js está rodando

```bash
# Verificar se há processo Node.js rodando na porta 3011
lsof -i :3011
# ou
netstat -tulpn | grep 3011
# ou
ss -tulpn | grep 3011

# Verificar processos PM2
pm2 list
pm2 logs mautone-backend
```

**Se não estiver rodando:**
```bash
cd /www/wwwroot/mautone/backend
npm run build
pm2 start dist/server.js --name mautone-backend
pm2 save
```

#### 2. Verificar se o servidor responde localmente

```bash
# Testar diretamente na porta 3011
curl http://localhost:3011/
curl http://localhost:3011/health

# Deve retornar JSON, não "Cannot GET"
```

**Se retornar "Cannot GET":**
- O servidor não está rodando
- O código compilado está desatualizado (fazer rebuild)
- A porta está errada

#### 3. Verificar configuração do Nginx

O Nginx precisa estar configurado para rotear as requisições da API para o Node.js.

**Localizar arquivo de configuração do Nginx:**
```bash
# Geralmente está em um destes locais:
/etc/nginx/sites-available/mautone.com.br
/etc/nginx/conf.d/mautone.com.br.conf
/etc/nginx/nginx.conf
```

**Verificar configuração atual:**
```bash
sudo nginx -t
sudo cat /etc/nginx/sites-available/mautone.com.br
# ou
sudo cat /etc/nginx/conf.d/mautone.com.br.conf
```

#### 4. Configuração do Nginx para mautone.com.br

Você precisa de **duas configurações**:

**A) Frontend (React/Vite) - serve arquivos estáticos:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mautone.com.br www.mautone.com.br;

    # Redirecionar HTTP para HTTPS (se tiver SSL)
    # return 301 https://$server_name$request_uri;

    root /www/wwwroot/mautone/dist;  # Pasta do build do frontend
    index index.html;

    # Servir arquivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**B) API Backend - proxy reverso para Node.js:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.mautone.com.br;  # Subdomínio para API

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

**OU, se quiser API no mesmo domínio (mautone.com.br/api):**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mautone.com.br www.mautone.com.br;

    root /www/wwwroot/mautone/dist;
    index index.html;

    # API Backend - proxy para Node.js
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

    # Frontend - arquivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 5. Aplicar configuração do Nginx

```bash
# Testar configuração
sudo nginx -t

# Se OK, recarregar Nginx
sudo systemctl reload nginx
# ou
sudo service nginx reload
```

#### 6. Verificar logs do Nginx

```bash
# Ver logs de erro
sudo tail -f /var/log/nginx/error.log

# Ver logs de acesso
sudo tail -f /var/log/nginx/access.log
```

#### 7. Verificar se a porta no Nginx está correta

**IMPORTANTE:** O Nginx deve apontar para `http://localhost:3011`, NÃO para `http://localhost:3001`!

```bash
# Verificar se há referências à porta 3001 no Nginx
sudo grep -r "3001" /etc/nginx/

# Se encontrar, substituir por 3011
```

### Checklist de Verificação

- [ ] Servidor Node.js está rodando na porta 3011
- [ ] `curl http://localhost:3011/` retorna JSON (não "Cannot GET")
- [ ] Arquivo `.env` tem `PORT=3011`
- [ ] Código foi compilado (`npm run build`)
- [ ] Nginx está configurado e apontando para `http://localhost:3011`
- [ ] Nginx foi recarregado após mudanças (`sudo nginx -t && sudo systemctl reload nginx`)
- [ ] Frontend está configurado para usar a URL correta da API

### Comandos Rápidos de Diagnóstico

```bash
# 1. Verificar se Node.js está rodando
pm2 list
curl http://localhost:3011/health

# 2. Verificar configuração do Nginx
sudo nginx -t
sudo grep -r "3011\|3001" /etc/nginx/

# 3. Verificar logs
pm2 logs mautone-backend
sudo tail -20 /var/log/nginx/error.log

# 4. Rebuild e restart completo
cd /www/wwwroot/mautone/backend
npm run build
pm2 restart mautone-backend
sudo systemctl reload nginx
```

### Solução Rápida (Se tudo mais falhar)

```bash
# 1. Parar tudo
pm2 stop all
sudo systemctl stop nginx

# 2. Rebuild backend
cd /www/wwwroot/mautone/backend
npm run build

# 3. Verificar .env
cat .env | grep PORT  # Deve mostrar PORT=3011

# 4. Iniciar backend
pm2 start dist/server.js --name mautone-backend
pm2 save

# 5. Testar localmente
curl http://localhost:3011/

# 6. Reiniciar Nginx
sudo systemctl start nginx
sudo systemctl reload nginx

# 7. Testar no navegador
curl https://mautone.com.br/api/health
```
