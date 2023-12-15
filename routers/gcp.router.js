const express = require('express');
const router = express.Router();
const GCPController = require('../controllers/gcp.controller');

router.post('/uploadToGCP', GCPController.uploadToGCP);

module.exports = router;