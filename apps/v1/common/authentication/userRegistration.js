const appRoot =require('app-root-path');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const Usermodel = require(appRoot+'/models/userModel');
const {genPassword,validPassword,issueJWT} =require(appRoot+"/apps/v1/common/utils/passwordandtokenutils");
const {validation} = require(appRoot+'/apps/v1/common/utils/userSchema_validation');

const pathToPubKey = appRoot+'/id_rsa_pub.pem';
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

createUser=async(req,res)=>{
    try {
        if (req.jwt.role==="superuser") {
            if (req.body.id) {
                IDcheck =await Usermodel.findOne({"username":req.body.id})    
            } else {
                  res.status(422).send({success:false,"message":"Please enter all fields"})
            }
            if (!IDcheck) {
                userEmailcheck =await Usermodel.findOne({"email":req.body.email})
                if (!userEmailcheck) {
                    userData={
                        "id":req.body["id"],
                        "email":req.body["email"],
                        "role_ids":req.body["role_ids"],
                        "firstName":req.body["firstName"],
                        "lastName":req.body["lastName"],
                        "mobile":req.body["mobile"],
                        "password":req.body["password"],
                        "conformPassword":req.body["conformPassword"]
                    }
                    validate =validation(userData)
                    if (!validate.error) {
                        const {salt,hash}=genPassword(userData.password)
                        delete userData.conformPassword
                        delete userData.password
                        userData.salt=salt
                        userData.hash=hash
                        const user = new Usermodel(userData)
                        const userSave =await user.save()
                         res.status(201).send({success:true,"message":"User successfully created"})
                    }
                     else {
                         res.status(422).send({success:false,"message":validate.error.message})
                        
                    }
                } else {
                     res.status(422).send({success:false,"message":"Email Already exists"})
                }
            } else {
                 res.status(422).send({success:false,"message":"Id Already exists"})
            }
        } else {
             res.status(401).send({success:false,message:"You are not authorized to visit this route"})
        }  
    } catch (error) {
         res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}

login = async(req, res, next)=>{
    try {
        Usermodel.findOne({id:req.body.id},{_id:1,email:1,id:1,hash:1,salt:1,role_ids:1})
                .then((user) => {
                    if (!user) {
                        res.status(401).json({success: false,  "message": "ID is invalid" });
                    }else{
                    const isValid = validPassword(req.body.password, user.hash, user.salt);
                    if (isValid) {
                        const tokenObject = issueJWT(user);
                        tokenParts=tokenObject.token.split(' ')
                        expiresIn=jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] }).exp;
                        res.status(200).json({ success: true, data:{token: tokenObject.token, expiresIn: expiresIn,role:user.role_ids}});
                    } else {
                         res.status(401).json({ success: false,  "message": "you entered the wrong password" });
                    }}
                })
                .catch((err) => {
                     res.status(401).json({ success: false,  "message": "you entered the wrong Id"});
                });
    }catch (error) {
         res.status(401).json({ success: false,  "message": "Something when wrong please try again" });
    }}
    


module.exports.createUser = createUser
module.exports.login = login


