const AWS = require("aws-sdk");

AWS.config.update({
    secretAccessKey: "f/4AqIzVwemQPNlxa6YIDMnPK7yjcAfM70aeF3nQ",
    accessKeyId: "AKIAXPOJ3AITORV6BFKD",
    region: "ap-south-1",
});

var s3 = new AWS.S3();

const handleFileUpload = (req, res) => {
  const { originalname, buffer } = req.file;

  console.log(buffer);
  
  let params = {
    ACL: "public-read", 
    Bucket: "imageuploaddemo1",
    Key: originalname,
    Body: buffer,
  };

  s3.upload(params, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Failed to upload",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "File Uploaded",
      imageURL: result.Location,
      result,
    });
  });



};

module.exports = {
  handleFileUpload,
};


