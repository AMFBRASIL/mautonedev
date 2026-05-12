# 🔧 Troubleshooting - Problemas Comuns

## Erro: EADDRINUSE (Porta já em uso)

### Problema
```
Error: listen EADDRINUSE: address already in use :::3001
```

### Soluções

#### 1. Verificar se a porta está em uso

```bash
# Ver qual processo está usando a porta 3001
lsof -i :3001
# ou
netstat -tulpn | grep 3001
# ou
ss -tulpn | grep 3001
```

#### 2. Matar o processo que está usando a porta

```bash
# Encontrar o PID do processo
lsof -i :3001

# Matar o processo (substitua PID pelo número encontrado)
kill -9 PID

# Ou matar todos os processos Node.js
pkill -f node
```

#### 3. Verificar se o .env está configurado corretamente

```bash
cd /www/wwwroot/mautone/backend

# Verificar se o arquivo .env existe
ls -la .env

# Verificar o conteúdo (certifique-se que PORT=3011)
cat .env | grep PORT
```

#### 4. Verificar se o .env está sendo carregado

O arquivo `.env` deve estar na pasta `backend/` (mesmo nível do `package.json`):

```
backend/
├── .env          ← Deve estar aqui
├── package.json
├── src/
└── dist/
```

#### 5. Rebuild após mudar o .env

Se você mudou o `.env`, precisa fazer rebuild:

```bash
cd /www/wwwroot/mautone/backend
npm run build
npm start
```

#### 6. Usar PM2 para gerenciar o processo

```bash
# Parar processos antigos do PM2
pm2 stop all
pm2 delete all

# Rebuild
npm run build

# Iniciar com PM2
pm2 start dist/server.js --name mautone-backend

# Ver logs
pm2 logs mautone-backend
```

## Verificar se o servidor está rodando na porta correta

```bash
# Verificar se está rodando na porta 3011
lsof -i :3011
netstat -tulpn | grep 3011

# Testar a API
curl http://localhost:3011/health
```

## Checklist de Configuração

- [ ] Arquivo `.env` existe em `backend/.env`
- [ ] `PORT=3011` está definido no `.env`
- [ ] Nenhum outro processo está usando a porta 3011
- [ ] Build foi executado após mudar o `.env`
- [ ] Servidor foi reiniciado após mudanças
