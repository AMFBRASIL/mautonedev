# Exemplo de Configuração .env

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
# Server Configuration
PORT=3011
FRONTEND_URL=http://localhost:8080
# Para produção, use: FRONTEND_URL=https://mautone.com.br

# Mailgun Configuration
# Obtenha sua API Key em: https://app.mailgun.com/settings/api_security
MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Domínio do Mailgun (sandbox ou seu domínio próprio)
# Exemplo sandbox: sandbox1234567890abcdef.mailgun.org
# Exemplo domínio próprio: mg.seudominio.com.br
MAILGUN_DOMAIN=sandbox1234567890abcdef.mailgun.org

# Email de origem (remetente)
MAILGUN_FROM_EMAIL=noreply@seudominio.com.br

# Email de destino (onde receberá as mensagens)
MAILGUN_TO_EMAIL=contato@andersonmautone.com.br
CONTACT_EMAIL=contato@andersonmautone.com.br
```

## Como obter as credenciais do Mailgun:

1. **API Key:**
   - Faça login no [Mailgun Dashboard](https://app.mailgun.com)
   - Vá em **Settings** → **API Keys**
   - Copie a **Private API key**

2. **Domain:**
   - Vá em **Sending** → **Domains**
   - Use o domínio sandbox fornecido (para testes)
   - Ou adicione seu próprio domínio (para produção)

3. **Emails:**
   - `MAILGUN_FROM_EMAIL`: Email que aparecerá como remetente
   - `CONTACT_EMAIL`: Seu email onde receberá os contatos
