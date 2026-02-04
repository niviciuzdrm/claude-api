const config = require('../config/app.config');
const packageJson = require('../../package.json');

class AppController {
  /**
   * GET /api/v1/health
   * Health check geral da aplicação
   */
  async health(_req, res) {
    res.status(200).json({
      success: true,
      status: 'ok',
      message: 'API está funcionando',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.server.env
    });
  }

  /**
   * GET /api/v1/info
   * Informações sobre a API
   */
  async info(_req, res) {
    res.status(200).json({
      success: true,
      data: {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        environment: config.server.env,
        node_version: process.version,
        uptime: process.uptime()
      }
    });
  }

  /**
   * Rota não encontrada (404)
   */
  notFound(req, res) {
    res.status(404).json({
      success: false,
      error: {
        message: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
      }
    });
  }
}

module.exports = new AppController();