# 📧 Backend - Serviço de Email

Backend simples para envio de emails do formulário de contato do portfólio.

## 🚀 Instalação

```bash
cd backend
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na pasta `backend/`:

```env
# Server Configuration
PORT=3011
FRONTEND_URL=http://localhost:8080

# Mailgun Configuration
MAILGUN_API_KEY=sua-api-key-do-mailgun
MAILGUN_DOMAIN=seu-dominio.mailgun.org
MAILGUN_FROM_EMAIL=noreply@seu-dominio.com.br
MAILGUN_TO_EMAIL=contato@andersonmautone.com.br

# Contact Email (onde receberá as mensagens)
CONTACT_EMAIL=contato@andersonmautone.com.br
```

2. Crie um arquivo `.env` na raiz do projeto para o frontend:

```env
VITE_API_URL=http://localhost:3011
```

### 📧 Configuração do Mailgun

1. **Criar conta no Mailgun:**
   - Acesse [https://www.mailgun.com](https://www.mailgun.com)
   - Crie uma conta gratuita (permite até 5.000 emails/mês)

2. **Obter API Key:**
   - Após criar a conta, vá em **Settings** → **API Keys**
   - Copie a **Private API key** (não a Public key)
   - Cole no `.env` como `MAILGUN_API_KEY`

3. **Configurar Domínio:**
   - Vá em **Sending** → **Domains**
   - Você pode usar o domínio sandbox fornecido pelo Mailgun (ex: `sandbox123456.mailgun.org`)
   - Ou adicione seu próprio domínio seguindo as instruções do Mailgun
   - Use o domínio no `.env` como `MAILGUN_DOMAIN`

4. **Configurar Email de Origem:**
   - `MAILGUN_FROM_EMAIL`: Email que aparecerá como remetente
   - Pode ser `noreply@seu-dominio.com.br` ou usar o formato do Mailgun

5. **Configurar Email de Destino:**
   - `CONTACT_EMAIL` ou `MAILGUN_TO_EMAIL`: Email onde você receberá as mensagens
   - Este é o email que receberá os contatos do formulário

**Nota:** O domínio sandbox do Mailgun só permite enviar para emails verificados. Para produção, configure seu próprio domínio.

## 🏃 Executar

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```

### Frontend (Terminal 2)
```bash
npm run dev
```

## 📡 Endpoints

### POST `/api/email/send`

Envia um email de contato.

**Body:**
```json
{
  "name": "Nome do Cliente",
  "email": "cliente@email.com",
  "subject": "Assunto da Mensagem",
  "message": "Conteúdo da mensagem..."
}
```

**Response (Sucesso):**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!"
}
```

### GET `/`

Retorna informações sobre a API.

**Response:**
```json
{
  "message": "Mautone Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "sendEmail": "POST /api/email/send"
  }
}
```

### GET `/health`

Verifica se o servidor está rodando.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🔒 Segurança

- Validação de dados com Zod
- CORS configurado para o frontend
- Variáveis sensíveis em `.env` (não commitadas)
