# === STAGE 1: BUILD ===
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Instala TUDO (incluindo devDependencies)
RUN npm ci 
COPY . .

# === STAGE 2: PRODUCTION ===
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
# Instala APENAS dependências de produção
RUN npm ci --omit=dev 
COPY --from=builder /app/server.js ./
EXPOSE 3000
CMD ["node", "server.js"]