const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../auth/verifyEmail");


// User Login and Token Generation
exports.userLogin = (req, res, next) => {
  email = req.body.email;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          error: "Authentication Failed",
        });
      }
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password, (err, isMatch) => {
        if (err) {
          return res.status(401).json({
            error: "Authentication Failed",
          });
        }

        if (!isMatch) {
          console.log("password dont match");
          return res.status(401).json({ error: "Authentication Failed" });
        }else if( user[0].role ===1){
          return res.status(404).json({msg:"Account not found in this section"})
        }
         else if (user[0].isEmailVerified === false) {
          console.log(user[0].isEmailVerified);
          verifyEmail.sendVerificationLink(
            req,
            res,
            user[0]._id,
            user[0].email
          );
          return res.status(403).json(
            "Your Email is not verified ! Click on link sent to your email id"
          );
        
      }
         else {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role,
            },
            process.env.JWT_KEY
          );
          console.log(token + " " + user[0].role)
          res.status(200).json({ token: token , role:user[0].role });
        }
      });
    });
  // next();
};


exports.adminLogin = (req, res, next) => {
  email = req.body.email;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          error: "Authentication Failed",
        });
      }
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password, (err, isMatch) => {
        if (err) {
          return res.status(401).json({
            error: "Authentication Failed",
          });
        }

        if (!isMatch) {
          console.log("password dont match");
          return res.status(401).json({ error: "Authentication Failed" });
         }
      // else if (user[0].isEmailVerified === false) {
      //     console.log(user[0].isEmailVerified);
      //     verifyEmail.sendVerificationLink(
      //       req,
      //       res,
      //       user[0]._id,
      //       user[0].email
      //     );
      //     return res.status(403).json(
      //       "Your Email is not verified ! Click on link sent to your email id"
      //     );
        
      // }
       if(user[0].role !=1){
         return res.status(401).json({msg:"Your are not authorized user"})
       }
         else {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role,
            },
            process.env.JWT_KEY
          );
          console.log(token + " " + user[0].role)
          res.status(200).json({ token: token , role:user[0].role });
        }
      });
    });
  // next();
};