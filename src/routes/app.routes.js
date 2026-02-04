const express = require('express');
const appController = require('../controllers/app.controller');

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check da API
 * @access  Public
 */
router.get('/health', appController.health.bind(appController));

/**
 * @route   GET /api/v1/info
 * @desc    Informações sobre a API
 * @access  Public
 */
router.get('/info', appController.info.bind(appController));

module.exports = router;