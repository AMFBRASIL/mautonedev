# 📊 Comparação: site_funcional vs mautone

## Análise do site_funcional

### Estrutura
```
site_funcional/
├── src/              ← Frontend React/Vite
├── dist/             ← Build do frontend
├── server.js         ← Servidor Express simples (porta 3010)
└── package.json
```

### Como funciona
1. **Frontend**: React/Vite (mesma tecnologia do mautone)
2. **Servidor**: `server.js` simples que:
   - Serve arquivos estáticos da pasta `dist`
   - Tem fallback para SPA (todas as rotas servem `index.html`)
   - Roda na porta **3010**
3. **Sem backend separado**: Tudo em um único processo Node.js

### server.js do site_funcional
```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3010;

// Servir arquivos estáticos da pasta dist
app.use(express.static(join(__dirname, 'dist')));

// Fallback para SPA - todas as rotas servem index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
```

### Configuração Nginx (provavelmente)
```nginx
location / {
    proxy_pass http://127.0.0.1:3010;  # Proxy para o server.js
    ...
}
```

---

## Estrutura atual do mautone

### Estrutura
```
mautone/
├── src/              ← Frontend React/Vite
├── dist/             ← Build do frontend
├── backend/
│   ├── src/          ← Backend Node.js/Express
│   ├── dist/         ← Build do backend
│   └── server.ts     ← Servidor da API (porta 3011)
└── package.json
```

### Como funciona
1. **Frontend**: React/Vite (mesma tecnologia)
2. **Backend**: Node.js/Express separado que:
   - Roda na porta **3011**
   - Tem API de email (`/api/email/send`)
   - Não serve arquivos estáticos

### Problema atual
- O Nginx está fazendo proxy de **TUDO** para o backend (porta 3011)
- O backend não serve arquivos estáticos do frontend
- Resultado: "Cannot GET"

---

## Soluções para o mautone

### ✅ Opção 1: Manter estrutura separada (RECOMENDADA)

**Vantagens:**
- Separação de responsabilidades (frontend/backend)
- Escalabilidade (pode escalar backend independentemente)
- Manutenção mais fácil

**Como configurar:**

#### 1. Nginx deve servir frontend E fazer proxy apenas para `/api`:

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name mautone.com.br;
    
    # Pasta do frontend
    root /www/wwwroot/mautone/dist;
    
    # ... configurações SSL ...
    
    # API Backend - Proxy APENAS para /api
    location /api {
        proxy_pass http://127.0.0.1:3011;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Frontend - Servir arquivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 2. Backend continua rodando separadamente:
```bash
cd /www/wwwroot/mautone/backend
npm run build
pm2 start dist/server.js --name mautone-backend
```

**Estrutura no servidor:**
```
/www/wwwroot/mautone/
├── dist/              ← Frontend (servido pelo Nginx)
└── backend/
    └── dist/
        └── server.js  ← Backend (porta 3011, gerenciado pelo PM2)
```

---

### Opção 2: Unificar como site_funcional (ALTERNATIVA)

**Vantagens:**
- Estrutura mais simples (um único processo)
- Mesma abordagem do site_funcional

**Desvantagens:**
- Frontend e backend no mesmo processo
- Menos escalável

**Como implementar:**

#### 1. Criar `server.js` na raiz do projeto mautone:

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3011;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas do backend
import { emailRouter } from './backend/dist/routes/email.routes.js';
app.use('/api/email', emailRouter);

// Servir arquivos estáticos do frontend
app.use(express.static(join(__dirname, 'dist')));

// Fallback para SPA - todas as rotas servem index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📦 Frontend: servindo arquivos de 'dist'`);
  console.log(`🔧 Backend: API disponível em '/api/email'`);
});
```

#### 2. Atualizar `package.json` na raiz:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && cd backend && npm run build",
    "start": "node server.js"
  }
}
```

#### 3. Nginx faz proxy para um único servidor:

```nginx
location / {
    proxy_pass http://127.0.0.1:3011;  # Um único servidor
    ...
}
```

**Estrutura no servidor:**
```
/www/wwwroot/mautone/
├── dist/              ← Frontend
├── backend/
│   └── dist/          ← Backend compilado
└── server.js          ← Servidor unificado (porta 3011)
```

---

## Recomendação

**Use a Opção 1** (estrutura separada) porque:
1. ✅ Já está implementada e funcionando
2. ✅ Melhor separação de responsabilidades
3. ✅ Mais fácil de escalar o backend se necessário
4. ✅ Permite deploy independente do frontend e backend
5. ✅ Apenas precisa ajustar o Nginx (já documentado em `NGINX-CONFIG.md`)

A Opção 2 só faz sentido se você quiser simplificar para ter exatamente a mesma estrutura do `site_funcional`.

---

## Checklist para implementar Opção 1

- [ ] Verificar se o frontend foi feito build: `cd /www/wwwroot/mautone && npm run build`
- [ ] Verificar se o backend está rodando: `pm2 list` e `curl http://127.0.0.1:3011/health`
- [ ] Atualizar configuração do Nginx conforme `NGINX-CONFIG.md`
- [ ] Testar: `sudo nginx -t && sudo systemctl reload nginx`
- [ ] Verificar: `curl https://mautone.com.br/` e `curl https://mautone.com.br/api/health`

---

## Diferenças principais

| Aspecto | site_funcional | mautone (atual) |
|---------|---------------|-----------------|
| **Porta** | 3010 | 3011 |
| **Estrutura** | Frontend + server.js simples | Frontend + Backend separado |
| **Backend** | Não tem | Sim (API de email) |
| **Nginx** | Proxy para porta 3010 | Deve servir frontend + proxy `/api` para 3011 |
| **Complexidade** | Simples | Média |
