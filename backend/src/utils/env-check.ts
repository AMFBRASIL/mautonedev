/**
 * Verifica se todas as variáveis de ambiente necessárias estão configuradas
 */
export function checkMailgunEnv(): { valid: boolean; missing: string[] } {
  const required = [
    'MAILGUN_API_KEY',
    'MAILGUN_DOMAIN',
  ];

  const optional = [
    'MAILGUN_FROM_EMAIL',
    'MAILGUN_TO_EMAIL',
    'CONTACT_EMAIL',
  ];

  const missing: string[] = [];

  // Verificar variáveis obrigatórias
  for (const key of required) {
    const value = process.env[key];
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  }

  // Verificar se pelo menos uma das opcionais está configurada
  const hasContactEmail = 
    (process.env.CONTACT_EMAIL && process.env.CONTACT_EMAIL.trim() !== '') ||
    (process.env.MAILGUN_TO_EMAIL && process.env.MAILGUN_TO_EMAIL.trim() !== '');

  if (!hasContactEmail) {
    missing.push('CONTACT_EMAIL ou MAILGUN_TO_EMAIL');
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Exibe mensagem de erro amigável se as variáveis estiverem faltando
 */
export function printEnvError(missing: string[]): void {
  console.error('\n❌ Erro: Variáveis de ambiente faltando!\n');
  console.error('As seguintes variáveis são necessárias no arquivo .env:\n');
  
  missing.forEach(key => {
    console.error(`  - ${key}`);
  });

  console.error('\n📝 Exemplo de arquivo .env:\n');
  console.error('MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.error('MAILGUN_DOMAIN=sandbox1234567890abcdef.mailgun.org');
  console.error('MAILGUN_FROM_EMAIL=noreply@seudominio.com.br');
  console.error('CONTACT_EMAIL=contato@andersonmautone.com.br\n');
  console.error('💡 Dica: Crie o arquivo .env na pasta backend/ com essas variáveis.\n');
}
