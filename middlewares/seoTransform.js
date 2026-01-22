export const seoTransform = async(req, res, next) => { 
    if(req.body.seo && typeof req.body.seo === 'string') {
        req.body.seo = JSON.parse(req.body.seo);
    }
    next();
}