const app = require('./app');
const config = require('./config/app.config');
const logger = require('./utils/logger');

function startServer() {
  const { port, host, env } = config.server;

  const server = app.listen(port, host, () => {
    logger.success(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🚀 Servidor iniciado com sucesso!                          ║
║                                                               ║
║   Ambiente:  ${env.padEnd(48)}║
║   Host:      ${host.padEnd(48)}║
║   Porta:     ${port.toString().padEnd(48)}║
║                                                               ║
║   URL:       http://${host === '0.0.0.0' ? 'localhost' : host}:${port.toString().padEnd(37)}║
║   API:       http://${host === '0.0.0.0' ? 'localhost' : host}:${port}${config.api.prefix.padEnd(26)}║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    `);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      logger.error(`Porta ${port} já está em uso`);
    } else {
      logger.error('Erro ao iniciar servidor:', error);
    }
    process.exit(1);
  });

  process.on('SIGTERM', () => {
    logger.warn('SIGTERM recebido, encerrando servidor...');
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.warn('SIGINT recebido, encerrando servidor...');
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });
}

startServer();