const express = require('express');
const { handleGenerateUrl, GenerateFinalURl, analyticsData } = require('../controllers/url.controllers.js')
const router = express.Router();


router
    .post('/', handleGenerateUrl)
    .get('/:shortId', GenerateFinalURl)
    .get('/analytics/:shortId', analyticsData)



module.exports = router;