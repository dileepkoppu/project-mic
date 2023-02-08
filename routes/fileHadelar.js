const multer = require('multer');
const appRoot =require("app-root-path")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, appRoot+'/uploads');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now()+file.originalname);
  }
});
const mimeToExt = {
  "text/csv": 'csv',
}

const fileFilter = (req, file, cb) => {
  
  // reject a file
  if (mimeToExt[file.mimetype]) {
    cb(null, true);
  } else {
    console.log("nice");
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports.upload =upload


