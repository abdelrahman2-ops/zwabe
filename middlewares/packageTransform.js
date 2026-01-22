
export const transformPackageData = (req, res, next) => {

        console.log(req.body);

    if (req.body.itinerary && typeof req.body.itinerary === "string") {
        const fixedJson = `[${req.body.itinerary}]`;
        req.body.itinerary = JSON.parse(fixedJson);
    }
    if (req.body.includes && typeof req.body.includes === "string") {
        req.body.includes = [`${req.body.includes}`];
    }
    if (req.body.excludes && typeof req.body.excludes === "string") {
        req.body.excludes = [`${req.body.excludes}`]
    }
    
    next();
};
