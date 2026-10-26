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
  private initialized = false;

  constructor() {
    this.mailgun = new Mailgun(formData);
  }

  private initializeClient() {
    if (this.initialized && this.mg) return;

    const apiKey = process.env.MAILGUN_API_KEY;
    if (!apiKey?.trim()) {
      throw new Error(
        "MAILGUN_API_KEY is required. Please set it in backend/.env"
      );
    }

    // Região: US (padrão) ou EU — https://api.eu.mailgun.net
    const url = process.env.MAILGUN_URL?.trim() || undefined;

    this.mg = this.mailgun.client({
      username: "api",
      key: apiKey.trim(),
      ...(url ? { url } : {}),
    });
    this.initialized = true;
  }

  private escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (m) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return map[m];
    });
  }

  private formatMessage(message: string): string {
    return this.escapeHtml(message).replace(/\n/g, "<br>");
  }

  /** Cópia para a Express Dev (promautone@gmail.com) */
  private getNotificationTemplate(data: ContactEmailData): string {
    const { name, email, subject, message } = data;
    const formattedMessage = this.formatMessage(message);
    const safeName = this.escapeHtml(name);
    const safeEmail = this.escapeHtml(email);
    const safeSubject = this.escapeHtml(subject);
    const replySubject = encodeURIComponent(`Re: ${subject}`);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo contato — Express Dev</title>
</head>
<body style="margin:0;padding:0;background:#0B1220;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B1220;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:16px;overflow:hidden;border:1px solid #1f2937;">
          <tr>
            <td style="background:linear-gradient(135deg,#0891B2 0%,#F97316 100%);padding:32px 28px;text-align:center;">
              <p style="margin:0 0 8px;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Express Dev</p>
              <h1 style="margin:0;color:#fff;font-size:26px;line-height:1.3;">Novo contato do site</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Proposta / solicitação via mautone.com.br</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="margin:0 0 20px;display:inline-block;background:rgba(8,145,178,0.2);color:#22D3EE;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Lead comercial</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B1220;border-radius:12px;border:1px solid #1f2937;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 12px;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">Nome:</strong> ${safeName}</p>
                    <p style="margin:0 0 12px;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">E-mail:</strong> <a href="mailto:${safeEmail}" style="color:#22D3EE;text-decoration:none;">${safeEmail}</a></p>
                    <p style="margin:0;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">Assunto:</strong> ${safeSubject}</p>
                  </td>
                </tr>
              </table>

              <h2 style="margin:0 0 12px;color:#F9FAFB;font-size:16px;">Mensagem</h2>
              <div style="background:#0B1220;border-left:4px solid #F97316;border-radius:0 12px 12px 0;padding:18px 20px;color:#D1D5DB;font-size:15px;line-height:1.7;">
                ${formattedMessage}
              </div>

              <p style="margin:28px 0 0;text-align:center;">
                <a href="mailto:${safeEmail}?subject=${replySubject}" style="display:inline-block;background:#F97316;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px;">Responder ao cliente</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid #1f2937;text-align:center;">
              <p style="margin:0;color:#6B7280;font-size:12px;">Express Dev · Anderson Mautone</p>
              <p style="margin:6px 0 0;"><a href="https://mautone.com.br" style="color:#22D3EE;font-size:12px;text-decoration:none;">mautone.com.br</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  /** Cópia de confirmação para o cliente */
  private getConfirmationTemplate(data: ContactEmailData): string {
    const { name, subject, message } = data;
    const safeName = this.escapeHtml(name);
    const safeSubject = this.escapeHtml(subject);
    const formattedMessage = this.formatMessage(message);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recebemos sua mensagem — Express Dev</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#0891B2 0%,#0E7490 55%,#F97316 100%);padding:36px 28px;text-align:center;">
              <p style="margin:0 0 8px;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Express Dev</p>
              <h1 style="margin:0;color:#fff;font-size:26px;line-height:1.3;">Recebemos sua mensagem</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.92);font-size:15px;">Obrigado por falar com a gente</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 28px;">
              <p style="margin:0 0 16px;color:#111827;font-size:17px;font-weight:600;">Olá, ${safeName}!</p>
              <p style="margin:0 0 18px;color:#4B5563;font-size:15px;line-height:1.75;">
                Sua solicitação sobre <strong style="color:#0E7490;">“${safeSubject}”</strong> chegou com sucesso à
                <strong>Express Dev</strong>. Em breve nossa equipe analisa o pedido e retorna com os próximos passos.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECFEFF;border-radius:12px;border:1px solid #A5F3FC;margin:0 0 24px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0;color:#0F766E;font-size:14px;line-height:1.6;">
                      <strong>O que acontece agora?</strong><br>
                      Retorno em até 24 horas úteis · análise do escopo · proposta objetiva para o seu negócio.
                    </p>
                  </td>
                </tr>
              </table>

              <h2 style="margin:0 0 10px;color:#111827;font-size:15px;">Resumo do que você enviou</h2>
              <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 20px;color:#4B5563;font-size:14px;line-height:1.7;margin-bottom:24px;">
                ${formattedMessage}
              </div>

              <p style="margin:0 0 8px;color:#4B5563;font-size:15px;line-height:1.7;">
                Enquanto isso, você pode conhecer nossos serviços e cases em
                <a href="https://mautone.com.br" style="color:#0891B2;text-decoration:none;font-weight:600;">mautone.com.br</a>.
              </p>

              <p style="margin:28px 0 0;color:#111827;font-size:15px;line-height:1.6;">
                Atenciosamente,<br>
                <strong>Anderson Mautone</strong><br>
                <span style="color:#6B7280;font-size:13px;">Express Dev · Software &amp; GenAI</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#111827;padding:22px 28px;text-align:center;">
              <p style="margin:0 0 6px;color:#F9FAFB;font-size:13px;font-weight:700;">Express Dev</p>
              <p style="margin:0;color:#9CA3AF;font-size:12px;">
                <a href="mailto:contato@mautone.com.br" style="color:#22D3EE;text-decoration:none;">contato@mautone.com.br</a>
                ·
                <a href="https://mautone.com.br" style="color:#22D3EE;text-decoration:none;">mautone.com.br</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  async sendContactEmail(data: ContactEmailData): Promise<void> {
    this.initializeClient();

    const { name, email, subject, message } = data;
    const domain = process.env.MAILGUN_DOMAIN;
    const fromEmail = process.env.MAILGUN_FROM_EMAIL || `contato@${domain}`;
    const toEmail = process.env.CONTACT_EMAIL || process.env.MAILGUN_TO_EMAIL;

    if (!domain?.trim()) {
      throw new Error("MAILGUN_DOMAIN is required in backend/.env");
    }
    if (!toEmail?.trim()) {
      throw new Error("CONTACT_EMAIL is required in backend/.env");
    }

    const notificationHtml = this.getNotificationTemplate(data);
    const confirmationHtml = this.getConfirmationTemplate(data);

    const notificationText = `Novo contato — Express Dev

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
`;

    const confirmationText = `Recebemos sua mensagem — Express Dev

Olá ${name},

Sua solicitação sobre "${subject}" chegou com sucesso à Express Dev.
Retornaremos em até 24 horas úteis com os próximos passos.

Atenciosamente,
Anderson Mautone
Express Dev · Software & GenAI
contato@mautone.com.br | mautone.com.br
`;

    await Promise.all([
      // Cópia para a Express Dev
      this.mg.messages.create(domain, {
        from: `"Express Dev Site" <${fromEmail}>`,
        to: [toEmail],
        subject: `[Express Dev] Novo contato: ${subject}`,
        html: notificationHtml,
        text: notificationText,
        "h:Reply-To": email,
      }),
      // Cópia para o cliente
      this.mg.messages.create(domain, {
        from: `"Express Dev" <${fromEmail}>`,
        to: [email],
        subject: `Recebemos sua mensagem — ${subject}`,
        html: confirmationHtml,
        text: confirmationText,
      }),
    ]);
  }
}

export const emailService = new EmailService();
