# 🔧 Correção de Permissões - Produção

Se você encontrar o erro `Permission denied` ao executar `npm run build`, siga estas soluções:

## Solução 1: Usar npx (Recomendado)

O `package.json` já foi atualizado para usar `npx tsc` ao invés de `tsc` diretamente.

Execute:
```bash
npm run build
```

## Solução 2: Corrigir Permissões Manualmente

Se ainda tiver problemas, execute:

```bash
# Dar permissão de execução aos binários do node_modules
chmod +x node_modules/.bin/*

# Ou reinstalar as dependências
rm -rf node_modules package-lock.json
npm install
```

## Solução 3: Reinstalar Dependências

```bash
cd /www/wwwroot/mautone/backend
rm -rf node_modules
npm install
npm run build
```

## Solução 4: Usar TypeScript Globalmente

Se preferir, instale o TypeScript globalmente:

```bash
npm install -g typescript
npm run build
```

## Verificar Permissões

Para verificar se os arquivos têm permissão de execução:

```bash
ls -la node_modules/.bin/tsc
```

Deve mostrar algo como:
```
-rwxr-xr-x 1 root root ... tsc
```

O `x` indica permissão de execução.
