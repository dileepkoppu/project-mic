const appRoot = require("app-root-path")

const router = require("express").Router()



const { createstudentC,studentC_download,studentC_List,studentC_distinctYear,studentC_distinctBranch,studentC_distinctcName
                            } = require(appRoot+"/apps/v1/common/studentC.js")
const {checkauth} =require(appRoot+"/routes/middleware")
const {upload} = require(appRoot+"/routes/fileHadelar.js")



router.post("/studentC-create",checkauth,upload.single('details'),createstudentC)
router.get("/studentC-download",checkauth,studentC_download)
router.get('/studentC-List',studentC_List)
router.get('/studentC-List/distinctYear',studentC_distinctYear)
router.get('/studentC-List/distinctBranch',studentC_distinctBranch)
router.get('/studentC-List/distinctcName',studentC_distinctcName)


module.exports.router = router