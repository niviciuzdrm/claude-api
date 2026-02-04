const express = require('express');
const claudeController = require('../controllers/claude.controller');

const router = express.Router();

/**
 * @route   GET /api/v1/claude/version
 * @desc    Obtém a versão do Claude CLI instalado
 * @access  Public
 */
router.get('/version', claudeController.getVersion.bind(claudeController));

/**
 * @route   GET /api/v1/claude/health
 * @desc    Verifica saúde do Claude CLI
 * @access  Public
 */
router.get('/health', claudeController.healthCheck.bind(claudeController));

module.exports = router;