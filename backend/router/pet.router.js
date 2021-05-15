const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const Pet = require("../model/pet");
const petController = require("../controller/pet.controller");
const uploadS3 = require("../middleware/authenticate");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/addpet",
          uploadS3.uploadS3.array("pic_file"),
          petController.addpet
);


module.exports = router;