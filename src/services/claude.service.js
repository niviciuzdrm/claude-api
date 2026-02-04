const { exec } = require('child_process');
const { promisify } = require('util');
const config = require('../config/app.config');

// Converte exec baseado em callback para Promise
const execAsync = promisify(exec);

class ClaudeService {
  /**
   * Executa um comando do Claude CLI
   * @param {string} command - Comando a ser executado
   * @param {number} timeout - Timeout em milissegundos
   * @returns {Promise<Object>} Resultado da execução
   */
  async executeCommand(command, timeout = config.claude.timeout) {
    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout,
        encoding: 'utf8'
      });

      return {
        success: true,
        output: stdout.trim(),
        error: stderr ? stderr.trim() : null
      };
    } catch (error) {
      return {
        success: false,
        output: null,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Obtém a versão do Claude CLI instalado
   * @returns {Promise<Object>} Informações da versão
   */
  async getVersion() {
    const command = `${config.claude.command} --version`;
    const result = await this.executeCommand(command);

    if (!result.success) {
      throw new Error(`Falha ao obter versão do Claude: ${result.error}`);
    }

    return {
      version: result.output,
      command: command,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Verifica se o Claude CLI está instalado e funcionando
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      const result = await this.executeCommand(`${config.claude.command} --version`);
      return result.success;
    } catch (error) {
      return false;
    }
  }
}

// Exporta uma instância única (Singleton)
module.exports = new ClaudeService();