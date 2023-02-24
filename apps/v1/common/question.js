const appRoot =require("app-root-path");

const questionModel = require(appRoot+"/models/questionModel.js")
const {validation_q} = require(appRoot+'/apps/v1/common/utils/questionSchema_validation');


const createQuestion=async(req,res)=>{
    try {
        if (req.jwt.role==='superuser'){
            let data={
                "question":req.body.question,
                "options":[req.body.opt1,req.body.opt2,req.body.opt3,req.body.opt4],
                "Ans":req.body.Ans,
                "exam_id":req.params.id 
            }
            temp=data.options.indexOf(data.Ans)
            validate=validation_q(data)
            console.log(data);
            if (validate && temp>=0) {
                const question = new questionModel(data)
                const questionSave =await question.save()
                res.status(201).send({success:true,"message":"Question successfully created"})
            } else {
                res.status(422).send({success:false,"message":"Please provide vaild data"})
            }
        } else {
            res.status(401).send({success:false,message:"You are not authorized to visit this route"})   
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,"message":"something went wrong please try again"}) 
    }
}


const checkAns=async(req,res)=>{res.send('working')}


module.exports.createQuestion = createQuestion
module.exports.checkAns = checkAns