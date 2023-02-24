var validation_q = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        'question': Joi.string().required(),
        'options':Joi.array().length(4).required(),
        'Ans':Joi.string().required(),
        "exam_id": Joi.string().required()
    })
    return schema.validate(data)
}


module.exports.validation_q = validation_q