# 1. FROM — imagem base (Alpine Linux + Node.js ~131 MB em disco, ~45 MB comprimido no registry)
FROM node:22-alpine

# 2. WORKDIR — diretório de trabalho dentro do container
WORKDIR /app

# 3. COPY — copia manifestos primeiro (otimização de cache)
COPY package*.json ./

# 4. RUN — executa comando na build (instala dependências)
RUN npm ci --omit=dev

# 5. COPY — copia o código da aplicação
COPY . .

# 6. EXPOSE — documenta a porta (não publica! -p faz isso)
EXPOSE 3000

# 7. CMD — comando de inicialização (exec form)
CMD ["node", "server.js"]