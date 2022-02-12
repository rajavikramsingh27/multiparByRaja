const express = require("express");
const multer = require("multer");
const route = express.Router();
const appController = require("./fileUpload");

const upload = multer();

route.post("/upload", upload.single("file"), appController.handleFileUpload);

module.exports = route;
