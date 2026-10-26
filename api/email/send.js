function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (m) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[m];
  });
}

function formatMessage(message) {
  return escapeHtml(message).replace(/\n/g, "<br>");
}

function notificationHtml({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const formattedMessage = formatMessage(message);
  const replySubject = encodeURIComponent(`Re: ${subject}`);

  return `<!DOCTYPE html>
<html lang="pt-BR"><body style="margin:0;padding:0;background:#0B1220;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0B1220;padding:32px 16px;"><tr><td align="center">
<table width="600" style="max-width:600px;width:100%;background:#111827;border-radius:16px;overflow:hidden;border:1px solid #1f2937;">
<tr><td style="background:linear-gradient(135deg,#0891B2 0%,#F97316 100%);padding:32px 28px;text-align:center;">
<p style="margin:0 0 8px;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Express Dev</p>
<h1 style="margin:0;color:#fff;font-size:26px;">Novo contato do site</h1>
<p style="margin:10px 0 0;color:rgba(255,255,255,.9);font-size:15px;">Proposta / solicitação via mautone.com.br</p>
</td></tr>
<tr><td style="padding:32px 28px;">
<p style="margin:0 0 20px;display:inline-block;background:rgba(8,145,178,.2);color:#22D3EE;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;">Lead comercial</p>
<table width="100%" style="background:#0B1220;border-radius:12px;border:1px solid #1f2937;margin-bottom:24px;"><tr><td style="padding:20px 22px;">
<p style="margin:0 0 12px;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">Nome:</strong> ${safeName}</p>
<p style="margin:0 0 12px;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">E-mail:</strong> <a href="mailto:${safeEmail}" style="color:#22D3EE;text-decoration:none;">${safeEmail}</a></p>
<p style="margin:0;color:#9CA3AF;font-size:13px;"><strong style="color:#E5E7EB;">Assunto:</strong> ${safeSubject}</p>
</td></tr></table>
<h2 style="margin:0 0 12px;color:#F9FAFB;font-size:16px;">Mensagem</h2>
<div style="background:#0B1220;border-left:4px solid #F97316;border-radius:0 12px 12px 0;padding:18px 20px;color:#D1D5DB;font-size:15px;line-height:1.7;">${formattedMessage}</div>
<p style="margin:28px 0 0;text-align:center;">
<a href="mailto:${safeEmail}?subject=${replySubject}" style="display:inline-block;background:#F97316;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px;">Responder ao cliente</a>
</p>
</td></tr>
<tr><td style="padding:20px 28px 28px;border-top:1px solid #1f2937;text-align:center;">
<p style="margin:0;color:#6B7280;font-size:12px;">Express Dev · Anderson Mautone</p>
<p style="margin:6px 0 0;"><a href="https://mautone.com.br" style="color:#22D3EE;font-size:12px;text-decoration:none;">mautone.com.br</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

function confirmationHtml({ name, subject, message }) {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const formattedMessage = formatMessage(message);

  return `<!DOCTYPE html>
<html lang="pt-BR"><body style="margin:0;padding:0;background:#F3F4F6;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:32px 16px;"><tr><td align="center">
<table width="600" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,.08);">
<tr><td style="background:linear-gradient(135deg,#0891B2 0%,#0E7490 55%,#F97316 100%);padding:36px 28px;text-align:center;">
<p style="margin:0 0 8px;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Express Dev</p>
<h1 style="margin:0;color:#fff;font-size:26px;">Recebemos sua mensagem</h1>
<p style="margin:10px 0 0;color:rgba(255,255,255,.92);font-size:15px;">Obrigado por falar com a gente</p>
</td></tr>
<tr><td style="padding:36px 28px;">
<p style="margin:0 0 16px;color:#111827;font-size:17px;font-weight:600;">Olá, ${safeName}!</p>
<p style="margin:0 0 18px;color:#4B5563;font-size:15px;line-height:1.75;">
Sua solicitação sobre <strong style="color:#0E7490;">“${safeSubject}”</strong> chegou com sucesso à <strong>Express Dev</strong>. Em breve nossa equipe analisa o pedido e retorna com os próximos passos.
</p>
<table width="100%" style="background:#ECFEFF;border-radius:12px;border:1px solid #A5F3FC;margin:0 0 24px;"><tr><td style="padding:18px 20px;">
<p style="margin:0;color:#0F766E;font-size:14px;line-height:1.6;"><strong>O que acontece agora?</strong><br>Retorno em até 24 horas úteis · análise do escopo · proposta objetiva para o seu negócio.</p>
</td></tr></table>
<h2 style="margin:0 0 10px;color:#111827;font-size:15px;">Resumo do que você enviou</h2>
<div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 20px;color:#4B5563;font-size:14px;line-height:1.7;margin-bottom:24px;">${formattedMessage}</div>
<p style="margin:0 0 8px;color:#4B5563;font-size:15px;line-height:1.7;">
Enquanto isso, você pode conhecer nossos serviços em <a href="https://mautone.com.br" style="color:#0891B2;text-decoration:none;font-weight:600;">mautone.com.br</a>.
</p>
<p style="margin:28px 0 0;color:#111827;font-size:15px;line-height:1.6;">
Atenciosamente,<br><strong>Anderson Mautone</strong><br>
<span style="color:#6B7280;font-size:13px;">Express Dev · Software &amp; GenAI</span>
</p>
</td></tr>
<tr><td style="background:#111827;padding:22px 28px;text-align:center;">
<p style="margin:0 0 6px;color:#F9FAFB;font-size:13px;font-weight:700;">Express Dev</p>
<p style="margin:0;color:#9CA3AF;font-size:12px;">
<a href="mailto:contato@mautone.com.br" style="color:#22D3EE;text-decoration:none;">contato@mautone.com.br</a> ·
<a href="https://mautone.com.br" style="color:#22D3EE;text-decoration:none;">mautone.com.br</a>
</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

function envDiagnostics() {
  return {
    hasApiKey: Boolean(process.env.MAILGUN_API_KEY?.trim()),
    hasDomain: Boolean(process.env.MAILGUN_DOMAIN?.trim()),
    hasFrom: Boolean(process.env.MAILGUN_FROM_EMAIL?.trim()),
    hasContact: Boolean(
      process.env.CONTACT_EMAIL?.trim() || process.env.MAILGUN_TO_EMAIL?.trim()
    ),
    domain: process.env.MAILGUN_DOMAIN || null,
    mailgunUrl: process.env.MAILGUN_URL || "https://api.mailgun.net",
  };
}

async function postToMailgun(baseUrl, { apiKey, domain, from, to, subject, html, text, replyTo }) {
  const body = new URLSearchParams();
  body.set("from", from);
  body.set("to", to);
  body.set("subject", subject);
  body.set("html", html);
  body.set("text", text);
  if (replyTo) body.set("h:Reply-To", replyTo);

  const auth = Buffer.from(`api:${apiKey}`).toString("base64");
  const response = await fetch(`${baseUrl}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const raw = await response.text();
  return { ok: response.ok, status: response.status, raw };
}

async function sendMailgun({ to, subject, html, text, replyTo, from }) {
  const apiKey = process.env.MAILGUN_API_KEY?.trim();
  const domain = process.env.MAILGUN_DOMAIN?.trim();

  if (!apiKey || !domain) {
    const err = new Error(
      "MAILGUN_API_KEY e MAILGUN_DOMAIN são obrigatórios nas Environment Variables do Vercel"
    );
    err.code = "MISSING_ENV";
    throw err;
  }

  const preferred = (process.env.MAILGUN_URL || "https://api.mailgun.net").replace(
    /\/$/,
    ""
  );
  const fallback =
    preferred.includes("api.eu.mailgun.net")
      ? "https://api.mailgun.net"
      : "https://api.eu.mailgun.net";

  const payload = { apiKey, domain, from, to, subject, html, text, replyTo };
  let result = await postToMailgun(preferred, payload);

  // Conta na região errada costuma retornar 401/404 — tenta a outra automaticamente
  if (!result.ok && (result.status === 401 || result.status === 404)) {
    result = await postToMailgun(fallback, payload);
  }

  if (!result.ok) {
    const err = new Error(
      `Mailgun ${result.status}: ${result.raw || "falha ao enviar"}`
    );
    err.code =
      result.status === 401 || result.status === 403
        ? "MAILGUN_AUTH"
        : "MAILGUN_ERROR";
    err.status = result.status;
    throw err;
  }

  return result.raw;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({ success: false, message: "Nome inválido" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Email inválido" });
    }
    if (!subject || String(subject).trim().length < 3) {
      return res.status(400).json({ success: false, message: "Assunto inválido" });
    }
    if (!message || String(message).trim().length < 10) {
      return res.status(400).json({ success: false, message: "Mensagem inválida" });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    };

    const fromEmail =
      process.env.MAILGUN_FROM_EMAIL || `contato@${process.env.MAILGUN_DOMAIN}`;
    const toEmail =
      process.env.CONTACT_EMAIL ||
      process.env.MAILGUN_TO_EMAIL ||
      "promautone@gmail.com";

    await Promise.all([
      sendMailgun({
        from: `"Express Dev Site" <${fromEmail}>`,
        to: toEmail,
        subject: `[Express Dev] Novo contato: ${payload.subject}`,
        html: notificationHtml(payload),
        text: `Novo contato\n\nNome: ${payload.name}\nEmail: ${payload.email}\nAssunto: ${payload.subject}\n\n${payload.message}`,
        replyTo: payload.email,
      }),
      sendMailgun({
        from: `"Express Dev" <${fromEmail}>`,
        to: payload.email,
        subject: `Recebemos sua mensagem — ${payload.subject}`,
        html: confirmationHtml(payload),
        text: `Olá ${payload.name},\n\nRecebemos sua mensagem sobre "${payload.subject}". Retornaremos em até 24 horas úteis.\n\nExpress Dev\ncontato@mautone.com.br`,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    const code = error?.code || "UNKNOWN";
    const message =
      code === "MISSING_ENV"
        ? "Configuração de e-mail incompleta no servidor (variáveis Mailgun)."
        : code === "MAILGUN_AUTH"
          ? "Mailgun recusou a autenticação. Verifique a Private API Key e o domínio no Vercel."
          : "Erro ao enviar email. Tente novamente mais tarde.";

    return res.status(500).json({
      success: false,
      message,
      code,
      env: envDiagnostics(),
      mailgun: error?.message ? String(error.message).slice(0, 300) : undefined,
    });
  }
}
