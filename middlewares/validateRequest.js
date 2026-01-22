export const validateRequest = (schema) => (req, res, next) => {
    console.log('Validating request body:', req.body);
    const result = schema.safeParse(req.body)
    if(!result.success){
        console.log('Validation errors:', result.error.issues)
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        })
    }
    next()
}