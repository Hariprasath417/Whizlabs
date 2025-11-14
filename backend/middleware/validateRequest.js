// Joi-based validation middleware factory
const { handleBadRequest } = require('../config/errorhandler');

const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return handleBadRequest(res, { success: false, message: errorMessage });
        }

        req.body = value;
        next();
    };
};

module.exports = {
    validateBody,
};
