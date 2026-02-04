const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  logger.info(`→ ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? 'error' : 'info';
    
    logger[statusColor](`← ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;