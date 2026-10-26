export const config = {
  runtime: "nodejs",
  maxDuration: 20,
};

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
</td></tr>
<tr><td style="padding:32px 28px;color:#D1D5DB;font-size:15px;line-height:1.7;">
<p><strong style="color:#E5E7EB;">Nome:</strong> ${safeName}</p>
<p><strong style="color:#E5E7EB;">E-mail:</strong> <a href="mailto:${safeEmail}" style="color:#22D3EE;">${safeEmail}</a></p>
<p><strong style="color:#E5E7EB;">Assunto:</strong> ${safeSubject}</p>
<div style="margin-top:20px;padding:16px;background:#0B1220;border-left:4px solid #F97316;">${formattedMessage}</div>
<p style="margin-top:24px;text-align:center;">
<a href="mailto:${safeEmail}?subject=${replySubject}" style="display:inline-block;background:#F97316;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:8px;">Responder ao cliente</a>
</p>
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
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
<table width="600" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#0891B2 0%,#F97316 100%);padding:32px 28px;text-align:center;color:#fff;">
<p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Express Dev</p>
<h1 style="margin:0;font-size:26px;">Recebemos sua mensagem</h1>
</td></tr>
<tr><td style="padding:32px 28px;color:#4B5563;font-size:15px;line-height:1.7;">
<p style="color:#111827;font-weight:600;">Olá, ${safeName}!</p>
<p>Sua solicitação sobre <strong>“${safeSubject}”</strong> chegou à Express Dev. Retornaremos em até 24 horas úteis.</p>
<div style="margin:20px 0;padding:16px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;">${formattedMessage}</div>
<p>Atenciosamente,<br><strong>Anderson Mautone</strong><br>Express Dev · Software &amp; GenAI</p>
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

async function postMailgun(baseUrl, fields) {
  const apiKey = process.env.MAILGUN_API_KEY.trim();
  const domain = process.env.MAILGUN_DOMAIN.trim();
  const form = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value != null && value !== "") form.append(key, value);
  });

  const response = await fetch(`${baseUrl}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      // NÃO definir Content-Type manualmente com FormData
    },
    body: form,
  });

  const raw = await response.text();
  let parsed = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    raw,
    message: parsed?.message || raw || response.statusText,
    endpoint: baseUrl,
  };
}

async function sendOne(fields) {
  if (!process.env.MAILGUN_API_KEY?.trim() || !process.env.MAILGUN_DOMAIN?.trim()) {
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
  const fallback = preferred.includes("api.eu.mailgun.net")
    ? "https://api.mailgun.net"
    : "https://api.eu.mailgun.net";

  let result = await postMailgun(preferred, fields);
  if (!result.ok && (result.status === 401 || result.status === 404)) {
    result = await postMailgun(fallback, fields);
  }

  if (!result.ok) {
    const err = new Error(
      `Mailgun ${result.status} (${result.endpoint}): ${result.message}`
    );
    err.code =
      result.status === 401 || result.status === 403
        ? "MAILGUN_AUTH"
        : "MAILGUN_ERROR";
    err.status = result.status;
    throw err;
  }

  return result;
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) {
    return JSON.parse(req.body);
  }
  return {};
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = readBody(req);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (name.length < 2) {
      return res.status(400).json({ success: false, message: "Nome inválido" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Email inválido" });
    }
    if (subject.length < 3) {
      return res.status(400).json({ success: false, message: "Assunto inválido" });
    }
    if (message.length < 10) {
      return res.status(400).json({ success: false, message: "Mensagem inválida" });
    }

    const payload = { name, email, subject, message };
    const fromEmail =
      process.env.MAILGUN_FROM_EMAIL || `contato@${process.env.MAILGUN_DOMAIN}`;
    const toEmail =
      process.env.CONTACT_EMAIL ||
      process.env.MAILGUN_TO_EMAIL ||
      "promautone@gmail.com";

    await sendOne({
      from: `Express Dev Site <${fromEmail}>`,
      to: toEmail,
      subject: `[Express Dev] Novo contato: ${subject}`,
      html: notificationHtml(payload),
      text: `Novo contato\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${message}`,
      "h:Reply-To": email,
    });

    await sendOne({
      from: `Express Dev <${fromEmail}>`,
      to: email,
      subject: `Recebemos sua mensagem — ${subject}`,
      html: confirmationHtml(payload),
      text: `Olá ${name},\n\nRecebemos sua mensagem sobre "${subject}". Retornaremos em até 24 horas úteis.\n\nExpress Dev\ncontato@mautone.com.br`,
    });

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
          : code === "MAILGUN_ERROR"
            ? "Mailgun rejeitou o envio. Confira domínio verificado e remetente."
            : "Erro ao enviar email. Tente novamente mais tarde.";

    return res.status(500).json({
      success: false,
      message,
      code,
      env: envDiagnostics(),
      mailgun: String(error?.message || error).slice(0, 400),
    });
  }
}
