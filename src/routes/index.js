const express = require('express');
const router = express.Router();

const appRoutes = require('./app.routes');
const claudeRoutes = require('./claude.routes');

router.use('/', appRoutes);
router.use('/claude', claudeRoutes);

module.exports = router;