var validation_e = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        'title': Joi.string().required(),
        'cName': Joi.string().required(),
        'imgLink': Joi.string().required(),
        'description':Joi.string().required(),
        "totalNoOfQ": Joi.number().required()
    })
    return schema.validate(data)
}


module.exports.validation_e = validation_e