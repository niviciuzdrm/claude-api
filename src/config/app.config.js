module.exports = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development'
  },

  // Configurações da API
  api: {
    prefix: '/api/v1',
    timeout: 30000 // 30 segundos
  },

  // Configurações do Claude CLI
  claude: {
    command: 'claude',
    timeout: 10000 // 10 segundos para comandos do Claude
  }
};