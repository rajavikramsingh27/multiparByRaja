
const portAdress =  process.env.PORT || 3000

 const express = require("express")
 const app = express();
 const cors = require('cors')
 const path = require("path");
 const multer = require("multer");
 const AWS = require("aws-sdk");



 app.use(cors())
 app.use(express.json({ extended: false, limit: '500mb' }))
 app.use(express.urlencoded({ limit: '500mb', extended: false, parameterLimit: 500000 }))



 const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 0.5 * 1024 * 1024
    }
})

AWS.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  });
  
  var s3 = new AWS.S3();

app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'),  (req, res) => {

    const { originalname, buffer } = req.file;
    // const fileContent  = Buffer.from(req.file.data, 'binary');

    console.log(originalname);
    console.log(fileContent);    
    console.log(req.file);


    
    res.json({
        success: 1,
        // profile_url: 'http://localhost:4000/profile/'+req.file.filename
    })


    
})



 app.get("/", (req, res) => {
    return res.json({
        "Server Setup": "Node is connected",
        "baseURL" : "http://localhost:"+portAdress+"/"
    })
})



 app.listen(portAdress, () => {
     console.log("Server Connected for "+portAdress);
 })


