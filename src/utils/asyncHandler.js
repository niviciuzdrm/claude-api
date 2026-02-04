/**
 * Wrapper para funções assíncronas que captura erros automaticamente
 * @param {Function} fn - Função assíncrona do controller
 * @returns {Function} Middleware do Express
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;