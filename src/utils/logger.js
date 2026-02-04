const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class Logger {
  constructor() {
    this.enabled = process.env.NODE_ENV !== 'test';
  }

  /**
   * Formata uma mensagem de log com timestamp e cor
   */
  format(level, color, message, data = null) {
    if (!this.enabled) return;

    const timestamp = new Date().toISOString();
    const prefix = `${color}[${level}]${colors.reset}`;
    const time = `${colors.cyan}${timestamp}${colors.reset}`;
    
    let output = `${time} ${prefix} ${message}`;
    
    if (data) {
      output += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    console.log(output);
  }

  /**
   * Log de informação
   */
  info(message, data = null) {
    this.format('INFO', colors.blue, message, data);
  }

  /**
   * Log de sucesso
   */
  success(message, data = null) {
    this.format('SUCCESS', colors.green, message, data);
  }

  /**
   * Log de aviso
   */
  warn(message, data = null) {
    this.format('WARN', colors.yellow, message, data);
  }

  /**
   * Log de erro
   */
  error(message, data = null) {
    this.format('ERROR', colors.red, message, data);
  }

  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      this.format('DEBUG', colors.magenta, message, data);
    }
  }
}

module.exports = new Logger();