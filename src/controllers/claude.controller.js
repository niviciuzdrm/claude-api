const claudeService = require('../services/claude.service');
const logger = require('../utils/logger');

class ClaudeController {
  /**
   * GET /api/v1/claude/version
   * Retorna a versão do Claude CLI instalado
   */
  async getVersion(_req, res) {
    try {
      logger.info('Requisição para obter versão do Claude CLI');
      
      const versionInfo = await claudeService.getVersion();
      
      res.status(200).json({
        success: true,
        data: versionInfo
      });
    } catch (error) {
      logger.error('Erro ao obter versão do Claude:', error);
      
      res.status(500).json({
        success: false,
        error: {
          message: 'Erro ao obter versão do Claude CLI',
          details: error.message
        }
      });
    }
  }

  /**
   * GET /api/v1/claude/health
   * Verifica se o Claude CLI está funcionando
   */
  async healthCheck(req, res) {
    try {
      logger.info('Health check do Claude CLI');
      
      const isHealthy = await claudeService.healthCheck();

      const statusCode = isHealthy ? 200 : 503;
      
      res.status(statusCode).json({
        success: isHealthy,
        service: 'Claude CLI',
        status: isHealthy ? 'operational' : 'unavailable',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Erro no health check do Claude:', error);
      
      res.status(503).json({
        success: false,
        service: 'Claude CLI',
        status: 'error',
        error: error.message
      });
    }
  }
}

// Exporta uma instância única
module.exports = new ClaudeController();