const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const User = require("../model/user");
// const Auth = require("../router/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const accessKeyId = "AKIAZHZPWUIOLM66OAY6";
const secretAccessKey = "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";

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

exports.upload = multer({ storage });

//   exports.uploadS3 = multer({
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bucket-insta",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});

exports.Authenticate = async(req, res, next ) => {
    
    console.log("req.cookies       ", req.cookies)
    try{
        const token = req.cookies.jwtoken;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("verifyToken",verifyToken)
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!rootUser){
            {throw new Error('User not found')}

            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;

            next();
        }
    }catch(err){
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User Access denied" });
    }
    next();
  };
  
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Admin Access denied" });
    }
    next();
  };