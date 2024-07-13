const express = require('express');
const { handleGenerateUrl } = require('../controllers/url.controllers.js')
const router = express.Router();


router
    .post('/', handleGenerateUrl)


module.exports = router;