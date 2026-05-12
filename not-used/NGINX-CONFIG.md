# 🔧 Configuração do Nginx para mautone.com.br

## Problema Atual

A configuração atual do Nginx está fazendo proxy de **TODAS** as requisições para o backend Node.js, incluindo os arquivos estáticos do frontend. Isso causa o erro "Cannot GET" porque o backend não serve arquivos estáticos.

## Solução: Configuração Correta do Nginx

Atualize o arquivo de configuração do Nginx (`/www/server/panel/vhost/nginx/mautone.com.br.conf` ou similar) com a seguinte configuração:

```nginx
server
{
    listen 80;
    listen 443 ssl;
    server_name mautone.com.br;
    index index.html index.htm default.htm default.html;
    
    # Pasta do frontend (build do React/Vite)
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

## Mudanças Principais

1. **`root /www/wwwroot/mautone/dist;`** - Define a pasta do frontend (build do React/Vite)
2. **`location /api`** - Apenas requisições para `/api` vão para o backend Node.js
3. **`location /`** - Serve arquivos estáticos do frontend com `try_files` para suportar SPA routing
4. **Removido** - O proxy reverso genérico que estava redirecionando tudo para o backend

## Como Aplicar

1. **Fazer backup da configuração atual:**
```bash
sudo cp /www/server/panel/vhost/nginx/mautone.com.br.conf /www/server/panel/vhost/nginx/mautone.com.br.conf.backup
```

2. **Editar o arquivo de configuração:**
```bash
sudo nano /www/server/panel/vhost/nginx/mautone.com.br.conf
```

3. **Substituir o conteúdo** pelo código acima

4. **Testar a configuração:**
```bash
sudo nginx -t
```

5. **Se OK, recarregar o Nginx:**
```bash
sudo systemctl reload nginx
# ou
sudo service nginx reload
```

## Verificar se Está Funcionando

```bash
# 1. Verificar se o backend está rodando
curl http://127.0.0.1:3011/health

# 2. Verificar se a API responde através do Nginx
curl https://mautone.com.br/api/health

# 3. Verificar se o frontend está sendo servido
curl https://mautone.com.br/
```

## Estrutura de Pastas Esperada

```
/www/wwwroot/mautone/
├── dist/              ← Frontend (build do React/Vite)
│   ├── index.html
│   ├── assets/
│   └── ...
└── backend/          ← Backend Node.js
    ├── dist/
    │   └── server.js
    ├── .env
    └── ...
```

## Notas Importantes

- O frontend deve estar na pasta `/www/wwwroot/mautone/dist` (resultado do `npm run build` do frontend)
- O backend Node.js deve estar rodando na porta **3011** (não 3001!)
- Apenas requisições para `/api/*` são enviadas para o backend
- Todas as outras requisições são servidas como arquivos estáticos do frontend

## Se Ainda Der Erro

1. Verificar se o frontend foi feito build:
```bash
cd /www/wwwroot/mautone
npm run build
```

2. Verificar se o backend está rodando:
```bash
pm2 list
curl http://127.0.0.1:3011/health
```

3. Verificar logs:
```bash
sudo tail -f /www/wwwlogs/mautone.error.log
pm2 logs mautone-backend
```
