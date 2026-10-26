export default async function handler(req, res) {
  const env = {
    hasApiKey: Boolean(process.env.MAILGUN_API_KEY?.trim()),
    hasDomain: Boolean(process.env.MAILGUN_DOMAIN?.trim()),
    hasFrom: Boolean(process.env.MAILGUN_FROM_EMAIL?.trim()),
    hasContact: Boolean(
      process.env.CONTACT_EMAIL?.trim() || process.env.MAILGUN_TO_EMAIL?.trim()
    ),
    domain: process.env.MAILGUN_DOMAIN || null,
    mailgunUrl: process.env.MAILGUN_URL || "https://api.mailgun.net",
  };

  const ok = env.hasApiKey && env.hasDomain;

  return res.status(ok ? 200 : 503).json({
    ok,
    service: "email",
    env,
    hint: ok
      ? "Variáveis presentes. Se o envio falhar, confira a Private API Key e o domínio verificado no Mailgun."
      : "Adicione MAILGUN_API_KEY e MAILGUN_DOMAIN nas Environment Variables do Vercel e faça Redeploy.",
  });
}
