# 🔧 Corrigir Permissões - Frontend

## Problema
```
Error: The service was stopped: spawn /www/wwwroot/mautone/node_modules/@esbuild/linux-x64/bin/esbuild EACCES
```

**Causa:** Os binários do `node_modules` não têm permissão de execução.

## Solução Rápida

Execute os seguintes comandos:

```bash
cd /www/wwwroot/mautone

# Dar permissão de execução para todos os binários
chmod +x node_modules/.bin/*
chmod +x node_modules/@esbuild/linux-x64/bin/*

# Se ainda der erro, dar permissão recursiva para toda a pasta node_modules
chmod -R +x node_modules/.bin/
chmod -R +x node_modules/@esbuild/

# Tentar build novamente
npm run build
```

## Solução Alternativa (Reinstalar)

Se o problema persistir, reinstale as dependências:

```bash
cd /www/wwwroot/mautone

# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Tentar build novamente
npm run build
```

## Verificar Permissões

```bash
# Verificar se os binários têm permissão de execução
ls -la node_modules/.bin/esbuild
ls -la node_modules/@esbuild/linux-x64/bin/esbuild

# Deve mostrar algo como: -rwxr-xr-x (o 'x' indica permissão de execução)
```

## Se Ainda Der Erro

```bash
# Dar permissão completa para o usuário atual
cd /www/wwwroot/mautone
chown -R $(whoami) node_modules/
chmod -R 755 node_modules/

# Tentar build novamente
npm run build
```
