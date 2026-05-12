# 🔧 Configuração Nginx - Sem Erros no Painel

## Configuração que respeita as regras do painel

**IMPORTANTE:** Não modifique NADA dentro da seção `#SSL-START` até `#SSL-END`. O painel protege essa seção.

```nginx
server
{
    listen 80;
    listen 443 ssl http2;
    server_name mautone.com.br;
    index index.html index.htm default.htm default.html;
    
    # IMPORTANTE: Pasta do frontend (build do React/Vite)
    root /www/wwwroot/mautone/dist;
    
    #SSL-START SSL related configuration
    #error_page 404/404.html;
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    ssl_certificate    /www/server/panel/vhost/cert/mautone/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/mautone/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_tickets on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;
    #SSL-END
    
    #ERROR-PAGE-START  Error page configuration, allowed to be commented
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #REWRITE-START Pseudo-static related configuration
    include /www/server/panel/vhost/rewrite/node_mautone.conf;
    #REWRITE-END
    
    #Files or directories forbidden to access
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md|package.json|package-lock.json|\.env|node_modules) {
        return 404;
    }
    
    #One-click application for SSL certificate verification directory related settings
    location /.well-known/ {
        root  /www/wwwroot/mautone/backend/;
    }

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
        proxy_cache_bypass $http_upgrade;
    }
    # End of HTTP reverse proxy related settings <<<

    # Frontend - Servir arquivos estáticos do React/Vite
    location / {
        # Tentar servir arquivo, se não existir, servir index.html (SPA routing)
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    access_log  /www/wwwlogs/mautone.log;
    error_log  /www/wwwlogs/mautone.error.log;
}
```

## ⚠️ IMPORTANTE:

A linha `#error_page 404/404.html;` na linha 13 **DEVE PERMANECER EXATAMENTE COMO ESTÁ** (comentada dentro da seção SSL). O painel não permite modificar essa linha.

## O que foi feito:

1. ✅ Mantida a seção SSL **EXATAMENTE** como o painel espera (incluindo a linha `#error_page 404/404.html;`)
2. ✅ Adicionado `root /www/wwwroot/mautone/dist;` antes da seção SSL
3. ✅ Mantida a seção `#ERROR-PAGE-START` (permitida pelo painel)
4. ✅ Adicionado `location /api` para proxy da API
5. ✅ Modificado `location /` para servir arquivos estáticos

## Como aplicar:

1. No painel: **Site modification [mautone] → Config**
2. **Copie e cole** a configuração acima **COMPLETA**
3. **NÃO modifique** nada dentro de `#SSL-START` até `#SSL-END`
4. Salve

A configuração deve salvar sem erros agora!
