const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Auth = require("../router/auth");

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