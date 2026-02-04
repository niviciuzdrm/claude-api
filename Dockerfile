# Usar Ubuntu como base
FROM ubuntu:22.04

# Evitar prompts interativos durante a instalação
ENV DEBIAN_FRONTEND=noninteractive

# Definir variáveis de ambiente da aplicação
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Atualizar pacotes e instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Instalar Node.js (versão LTS via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Criar usuário não-root para rodar a aplicação
RUN useradd -m -u 1000 appuser

# Instalar a CLI do Claude como appuser
USER appuser
RUN curl -fsSL https://claude.ai/install.sh | bash

# Adicionar ~/.local/bin ao PATH do appuser
ENV PATH="/home/appuser/.local/bin:${PATH}"

# Voltar para root para instalar dependências e copiar arquivos
USER root

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências primeiro (melhor cache do Docker)
COPY package*.json ./

# Instalar dependências da aplicação
RUN npm install --production && npm cache clean --force

# Copiar o código fonte da aplicação
COPY src/ ./src/

# Expor a porta da API
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Mudar para appuser para rodar a aplicação
USER appuser

# Comando para iniciar a aplicação
CMD ["npm", "start"]