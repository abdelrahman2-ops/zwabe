
export const transformTourData = (req, res, next) => {
    if (req.body.paths && typeof req.body.paths === "string" || Array.isArray(req.body.paths)) {
        const fixedJson = `[${req.body.paths}]`;
        req.body.paths = JSON.parse(fixedJson);
    }
    if (req.body.includes && typeof req.body.includes === "string") {
        req.body.includes = [`${req.body.includes}`];
    }
    if (req.body.excludes && typeof req.body.excludes === "string") {
        req.body.excludes = [`${req.body.excludes}`]
    }
    next();
};
