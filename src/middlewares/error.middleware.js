const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
  logger.error('Erro capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Erro interno do servidor',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
}

function notFoundHandler(_req, _res, next) {
  const error = new Error('Rota não encontrada');
  error.statusCode = 404;
  next(error);
}

module.exports = {
  errorHandler,
  notFoundHandler
};