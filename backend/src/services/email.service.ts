import Mailgun from "mailgun.js";
import formData from "form-data";

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private mailgun: Mailgun;
  private mg: any;
  private initialized: boolean = false;

  constructor() {
    // Inicializar Mailgun
    this.mailgun = new Mailgun(formData);
  }

  private initializeClient() {
    if (this.initialized && this.mg) {
      return;
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    
    if (!apiKey || apiKey.trim() === "") {
      throw new Error(
        'MAILGUN_API_KEY is required. Please set it in your .env file.\n' +
        'Example: MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
    }

    // Criar cliente do Mailgun
    this.mg = this.mailgun.client({
      username: "api",
      key: apiKey,
    });

    this.initialized = true;
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  private formatMessage(message: string): string {
    // Escapar HTML e converter quebras de linha
    return this.escapeHtml(message).replace(/\n/g, "<br>");
  }

  private getNotificationTemplate(data: ContactEmailData): string {
    const { name, email, subject, message } = data;
    const formattedMessage = this.formatMessage(message);
    
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background-color: #f3f4f6;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            .header p {
              font-size: 16px;
              opacity: 0.95;
            }
            .content {
              padding: 40px 30px;
            }
            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
              color: white;
              padding: 6px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 30px;
            }
            .info-card {
              background: #f9fafb;
              border-left: 4px solid #0ea5e9;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
            }
            .info-row {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
            }
            .info-row:last-child {
              margin-bottom: 0;
            }
            .info-label {
              font-weight: 600;
              color: #6b7280;
              min-width: 80px;
              font-size: 14px;
            }
            .info-value {
              color: #1f2937;
              font-size: 15px;
            }
            .info-value a {
              color: #0ea5e9;
              text-decoration: none;
            }
            .info-value a:hover {
              text-decoration: underline;
            }
            .message-box {
              background: #f9fafb;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 24px;
              margin-top: 25px;
            }
            .message-box h3 {
              color: #1f2937;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
            }
            .message-box p {
              color: #4b5563;
              font-size: 15px;
              line-height: 1.8;
              white-space: pre-wrap;
            }
            .action-button {
              display: inline-block;
              margin-top: 30px;
              padding: 14px 32px;
              background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 15px;
            }
            .footer {
              background: #1f2937;
              color: #9ca3af;
              padding: 30px;
              text-align: center;
              font-size: 13px;
            }
            .footer p {
              margin-bottom: 8px;
            }
            .footer a {
              color: #0ea5e9;
              text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
              .header {
                padding: 30px 20px;
              }
              .content {
                padding: 30px 20px;
              }
              .info-row {
                flex-direction: column;
                align-items: flex-start;
              }
              .info-label {
                margin-bottom: 4px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>💼 Nova Mensagem Recebida</h1>
              <p>Você recebeu uma nova mensagem através do seu portfólio</p>
            </div>
            <div class="content">
              <span class="badge">Novo Contato</span>
              
              <div class="info-card">
                <div class="info-row">
                  <span class="info-label">👤 Nome:</span>
                  <span class="info-value">${this.escapeHtml(name)}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📧 Email:</span>
                  <span class="info-value"><a href="mailto:${email}">${this.escapeHtml(email)}</a></span>
                </div>
                <div class="info-row">
                  <span class="info-label">📌 Assunto:</span>
                  <span class="info-value">${this.escapeHtml(subject)}</span>
                </div>
              </div>

              <div class="message-box">
                <h3>💬 Mensagem:</h3>
                <p>${formattedMessage}</p>
              </div>

              <a href="mailto:${email}?subject=Re: ${subject}" class="action-button">
                Responder Mensagem
              </a>
            </div>
            <div class="footer">
              <p><strong>Anderson Mautone</strong> - Desenvolvedor de Software</p>
              <p>Esta mensagem foi enviada através do formulário de contato do portfólio</p>
              <p style="margin-top: 16px;">
                <a href="https://mautone.com.br">mautone.com.br</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getConfirmationTemplate(data: ContactEmailData): string {
    const { name, subject } = data;
    const escapedName = this.escapeHtml(name);
    const escapedSubject = this.escapeHtml(subject);
    
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background-color: #f3f4f6;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
              color: white;
              padding: 50px 30px;
              text-align: center;
            }
            .header-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 12px;
            }
            .header p {
              font-size: 16px;
              opacity: 0.95;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #1f2937;
              margin-bottom: 20px;
              font-weight: 500;
            }
            .message {
              color: #4b5563;
              font-size: 15px;
              line-height: 1.8;
              margin-bottom: 30px;
            }
            .highlight-box {
              background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%);
              border-left: 4px solid #0ea5e9;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .highlight-box p {
              color: #1f2937;
              font-size: 15px;
              margin: 0;
            }
            .info-section {
              background: #f9fafb;
              padding: 24px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .info-section h3 {
              color: #1f2937;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .info-section ul {
              list-style: none;
              padding: 0;
            }
            .info-section li {
              color: #4b5563;
              font-size: 14px;
              margin-bottom: 10px;
              padding-left: 24px;
              position: relative;
            }
            .info-section li:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #0ea5e9;
              font-weight: bold;
            }
            .footer {
              background: #1f2937;
              color: #9ca3af;
              padding: 30px;
              text-align: center;
              font-size: 13px;
            }
            .footer p {
              margin-bottom: 8px;
            }
            .footer a {
              color: #0ea5e9;
              text-decoration: none;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              color: #0ea5e9;
              margin: 0 10px;
              text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
              .header {
                padding: 40px 20px;
              }
              .content {
                padding: 30px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-icon">✅</div>
              <h1>Mensagem Recebida!</h1>
              <p>Obrigado por entrar em contato</p>
            </div>
            <div class="content">
              <p class="greeting">Olá ${escapedName},</p>
              
              <p class="message">
                Recebi sua mensagem sobre <strong>"${escapedSubject}"</strong> e agradeço muito pelo seu interesse em trabalhar comigo!
              </p>

              <div class="highlight-box">
                <p>
                  <strong>📧 Sua mensagem foi enviada com sucesso!</strong><br>
                  Vou analisar sua solicitação e retornarei em breve através do email fornecido.
                </p>
              </div>

              <div class="info-section">
                <h3>O que você pode esperar:</h3>
                <ul>
                  <li>Resposta em até 24 horas úteis</li>
                  <li>Análise detalhada do seu projeto</li>
                  <li>Proposta personalizada para suas necessidades</li>
                  <li>Suporte durante todo o processo</li>
                </ul>
              </div>

              <p class="message">
                Enquanto isso, sinta-se à vontade para explorar mais sobre meu trabalho e projetos em 
                <a href="https://mautone.com.br" style="color: #0ea5e9; text-decoration: none;">mautone.com.br</a>
              </p>

              <p class="message" style="margin-top: 30px;">
                Atenciosamente,<br>
                <strong style="color: #1f2937;">Anderson Mautone</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Desenvolvedor de Software</span>
              </p>
            </div>
            <div class="footer">
              <p><strong>Anderson Mautone</strong></p>
              <p>Desenvolvedor Avançado de Softwares Web</p>
              <p style="margin-top: 16px;">
                <a href="https://mautone.com.br">mautone.com.br</a> | 
                <a href="mailto:contato@mautone.com.br">contato@mautone.com.br</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async sendContactEmail(data: ContactEmailData): Promise<void> {
    // Inicializar cliente se ainda não foi inicializado
    this.initializeClient();

    const { name, email, subject, message } = data;

    const domain = process.env.MAILGUN_DOMAIN;
    const fromEmail = process.env.MAILGUN_FROM_EMAIL || `noreply@${domain}`;
    const toEmail = process.env.CONTACT_EMAIL || process.env.MAILGUN_TO_EMAIL;

    if (!domain || domain.trim() === "") {
      throw new Error(
        'MAILGUN_DOMAIN is required. Please set it in your .env file.\n' +
        'Example: MAILGUN_DOMAIN=sandbox1234567890abcdef.mailgun.org'
      );
    }

    if (!toEmail || toEmail.trim() === "") {
      throw new Error(
        'CONTACT_EMAIL or MAILGUN_TO_EMAIL is required. Please set it in your .env file.\n' +
        'Example: CONTACT_EMAIL=contato@andersonmautone.com.br'
      );
    }

    // Template de notificação para o dono do site
    const notificationHtml = this.getNotificationTemplate(data);
    const notificationText = `
Nova Mensagem do Portfólio

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
    `;

    // Template de confirmação para o cliente
    const confirmationHtml = this.getConfirmationTemplate(data);
    const confirmationText = `
Mensagem Recebida!

Olá ${name},

Recebi sua mensagem sobre "${subject}" e agradeço muito pelo seu interesse em trabalhar comigo!

Sua mensagem foi enviada com sucesso! Vou analisar sua solicitação e retornarei em breve através do email fornecido.

O que você pode esperar:
- Resposta em até 24 horas úteis
- Análise detalhada do seu projeto
- Proposta personalizada para suas necessidades
- Suporte durante todo o processo

Atenciosamente,
Anderson Mautone
Desenvolvedor de Software

mautone.com.br | contato@mautone.com.br
    `;

    // Enviar email de notificação para o dono do site
    const notificationData = {
      from: `"${name}" <${fromEmail}>`,
      to: [toEmail],
      subject: `💼 Nova Mensagem: ${subject}`,
      html: notificationHtml,
      text: notificationText,
      "h:Reply-To": email,
    };

    // Enviar email de confirmação para o cliente
    const confirmationData = {
      from: `"Anderson Mautone" <${fromEmail}>`,
      to: [email],
      subject: `✅ Mensagem Recebida: ${subject}`,
      html: confirmationHtml,
      text: confirmationText,
    };

    // Enviar ambos os emails
    await Promise.all([
      this.mg.messages.create(domain, notificationData),
      this.mg.messages.create(domain, confirmationData),
    ]);
  }
}

export const emailService = new EmailService();
