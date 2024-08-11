

const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();
const URL = require('../models/url.models.js')



//http://localhost:3000/url
async function handleGenerateUrl(req, res) {
    try {

        const body = req.body
        
        if (!body.url) {
            return res.json({
                message: 'Please Provide a url.',
                link:body.url
            })
        }

        let shortID = uid.rnd();
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visit: []
        })


        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${shortID}`;
        //"http://localhost:3000/url/n9Xi6x"

        return res.json({
            message: 'shortlink created successfully!',
            link: fullUrl,
        })



    } catch (error) {
        console.log(error);
    }

}

//http://localhost:3000/url/:shortId
async function GenerateFinalURl(req, res) {
    const shortId = req.params.shortId

    if (!shortId) return res.json({ message: "shortId is required with params" })

    let url = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visit: { timestamp: Date.now() },
            }
        }
    )

    if (!url || !url.redirectUrl) return res.json({ message: "not redirect url found" });

    // res.redirect work with http , alway remember on your link
    return res.redirect(`https://${url.redirectUrl}`);

}


async function analyticsData(req, res) {
    try {
        const shortId = req.params.shortId
        if (!shortId) return res.json({ message: "Please enter shortId" })
        const data = await URL.findOne({ shortId })
        const Analytics = [{ totalClicks: data.visit.length }, { clickedTimeData: data.visit }]
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


// Fix Redirect URL PROBLEM -