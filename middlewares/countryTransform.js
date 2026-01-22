export const transformCountryData = (req, res, next) => {
        if (req.body.data) {
                try {
                        const data = JSON.parse(req.body.data);
                        req.body = { ...req.body, ...data };
                        delete req.body.data;
                } catch (error) {
                        return next(new Error("Invalid JSON in 'data' field"));
                }
        }

        next();
};
