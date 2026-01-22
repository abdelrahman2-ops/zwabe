
export const transformSettingsdata = (req, res, next) => {
    if (req.body.contactInfo && typeof req.body.contactInfo === "string") {
        const contactInfo = req.body.contactInfo
        req.body.contactInfo = JSON.parse(contactInfo);
    }
    if (req.body.socialMedia && typeof req.body.socialMedia === "string") {
        const socialMedia = req.body.socialMedia
        req.body.socialMedia = JSON.parse(socialMedia);
    }


    // console.log('After parsing:', JSON.stringify(req.body, null, 2));

    next();
};


