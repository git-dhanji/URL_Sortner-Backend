

const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();
const URL = require('../models/url.models.js')
async function handleGenerateUrl(req, res) {
    
    const body = req.body;
    if(!body.url) return res.status(404).json({
        message: 'No redirect URL provided.'
    })

    const shorID = uid.rnd();
    await URL.create({
        shortID: shorID,
        redirectUrl:body.url,
        visit:[]
    })

    return res.json({
        message: 'ShortID created successfully!',
        shortenedUrl: shorID
    })
 
}

module.exports = {
    handleGenerateUrl
}
