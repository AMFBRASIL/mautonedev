# 🔧 Corrigir Erro de CORS

## Problema

```
Access to fetch at 'http://localhost:3011/api/email/send' from origin 'https://mautone.com.br' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:8080' that is not equal 
to the supplied origin.
```

## Causa

O backend está configurado para aceitar apenas `http://localhost:8080`, mas o frontend está rodando em `https://mautone.com.br`.

## Solução

### 1️⃣ Atualizar o arquivo `.env` do backend

```bash
cd /www/wwwroot/mautone/backend
nano .env
```

**Atualizar a linha `FRONTEND_URL`:**
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

**Salvar:** `Ctrl+X`, depois `Y`, depois `Enter`

### 2️⃣ Rebuild do backend

```bash
cd /www/wwwroot/mautone/backend
npm run build
```

### 3️⃣ Reiniciar o backend

```bash
# Se estiver usando PM2
pm2 restart mautone-backend

# Verificar logs
pm2 logs mautone-backend
```

### 4️⃣ Verificar se está funcionando

```bash
# Verificar se o CORS está configurado corretamente
curl -H "Origin: https://mautone.com.br" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://127.0.0.1:3011/api/email/send -v
```

**Deve retornar:**
```
Access-Control-Allow-Origin: https://mautone.com.br
```

### 5️⃣ Atualizar o frontend (se necessário)

O frontend já foi atualizado para usar URL relativa em produção. Se ainda estiver usando `http://localhost:3011`, faça rebuild:

```bash
cd /www/wwwroot/mautone
npm run build
```

## Verificação Final

1. ✅ `.env` tem `FRONTEND_URL=https://mautone.com.br`
2. ✅ Backend foi rebuild (`npm run build`)
3. ✅ Backend foi reiniciado (`pm2 restart mautone-backend`)
4. ✅ Frontend foi rebuild (se necessário)

## Teste no Navegador

Acesse `https://mautone.com.br` e tente enviar uma mensagem pelo formulário de contato. O erro de CORS deve estar resolvido.
