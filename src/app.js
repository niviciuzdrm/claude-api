const express = require('express');
const config = require('./config/app.config');
const routes = require('./routes');
const requestLogger = require('./middlewares/logger.middleware');
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');

class App {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    
    this.app.use(requestLogger);
    
    this.app.use((_req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });

    logger.info('Middlewares configurados');
  }

  setupRoutes() {
    this.app.get('/', (_req, res) => {
      res.json({
        success: true,
        message: 'API Docker Claude está rodando!',
        documentation: `${config.api.prefix}/info`,
        endpoints: {
          health: `${config.api.prefix}/health`,
          claudeVersion: `${config.api.prefix}/claude/version`,
          claudeHealth: `${config.api.prefix}/claude/health`
        }
      });
    });

    this.app.use(config.api.prefix, routes);

    logger.info(`Rotas registradas com prefixo: ${config.api.prefix}`);
  }

  setupErrorHandling() {
    this.app.use(notFoundHandler);

    this.app.use(errorHandler);

    logger.info('Handlers de erro configurados');
  }
  
  getApp() {
    return this.app;
  }
}

module.exports = new App().getApp();