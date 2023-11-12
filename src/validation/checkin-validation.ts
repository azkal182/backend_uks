import Joi from "joi";

const createCheckinValidation = Joi.object({
    name: Joi.string().max(100).required(),
    address: Joi.string().max(100).required(),
    room: Joi.string().max(100).required(),
    grade: Joi.string().max(100).optional(),
    complaint: Joi.string().max(100).required(),
    status: Joi.string().max(100).required(),
});

export {
    createCheckinValidation
}
