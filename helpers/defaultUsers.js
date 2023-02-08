const appRoot = require("app-root-path")
const Usermodel= require(appRoot+"/models/userModel")
const usersdata= require(appRoot+"/tempUsers")
const {genPassword} =require(appRoot+"/apps/v1/common/utils/passwordandtokenutils");
const {validation} = require(appRoot+'/apps/v1/common/utils/userSchema_validation');


saveUsers=async()=>{
    try {
        user=await Usermodel.countDocuments()
        if (user>=1) {
            return ""
        } else {
            for (const k in usersdata) {
                userData=usersdata[k]
                validate =validation(userData)
                if (!validate.error) {
                    const {salt,hash}=genPassword(userData.password)
                    delete userData.conformPassword
                    delete userData.password
                    userData.salt=salt
                    userData.hash=hash
                    const user = new Usermodel(userData)
                    const userSave =await user.save()
            }
            console.log('users created');
            return 'users created'
        }
    }} catch (error) {
        return error
    }
}


module.exports = saveUsers