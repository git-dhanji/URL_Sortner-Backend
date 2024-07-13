

const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();
const URL = require('../models/url.models.js')



async function handleGenerateUrl(req, res) {

    try {
        const body = req.body;
        if (!body.url) return res.status(404).json({
            message: 'No redirect URL provided.'
        })

        let shortID = uid.rnd();
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visit: []
        })

        return res.json({
            message: 'ShortID created successfully!',
            shortID: shortID
        })
    } catch (error) {
        console.log(error);
    }

}

async function GenerateFinalURl(req, res) {
    const shortId = req.params.shortId
    const url = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visit: { timestamp: Date.now() },
            }
        }
    )
    return res.redirect(url.redirectUrl)

}


async function analyticsData(req, res) {
    try {
        const shortId = req.params.shortId
        if (!shortId) return resjson({ message: "Please enter shortId" })
        const data = await URL.findOne({ shortId })
        const Analytics = [ {totalClicks: data.visit.length} , {clickedTimeData: data.visit }]
        return res
            .status(200)
            .json({
                message: "Analytics data fetched successfully",
                data: Analytics
            })

    } catch (error) {
        console.log(error)
        throw new Error("Couldn't fetch analytics")
    }

}

module.exports = {
    handleGenerateUrl,
    GenerateFinalURl,
    analyticsData
}
