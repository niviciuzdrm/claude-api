# Docker Ubuntu + Node.js + Express + Claude CLI

API REST construída com arquitetura escalável para executar comandos do Claude CLI em um container Docker baseado em Ubuntu

## Pré-requisitos

- Docker instalado ([Guia de instalação](https://docs.docker.com/get-docker/))
- Terminal/Command Line

## 🚀 Como Usar

### 1. Construir a Imagem Docker

```bash
docker build -t ubuntu-claude-api .
```

### 2️. Executar o Container

```bash
docker run -p 3000:3000 ubuntu-claude-api
```

### 3️. Testar a API

```bash
# Versão do Claude CLI ⭐
curl http://localhost:3000/api/v1/claude/version

# Health check
curl http://localhost:3000/api/v1/health
```

## Licença

MIT License