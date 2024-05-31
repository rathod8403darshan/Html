const Joi = require('joi');

const singupSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),

        confirmpassword: Joi.ref('password'),
})


module.exports={
    singupSchema
}