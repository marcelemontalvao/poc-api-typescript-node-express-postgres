import joi from "joi";

export const MovieSchema = joi.object({
    name: joi.string().min(3).required(),
    category: joi.string().min(2).required(),
    duration: joi.number().min(1).greater(0).required(),
    price: joi.number().required(), 
});