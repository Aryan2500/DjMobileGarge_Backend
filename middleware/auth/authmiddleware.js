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
          return res.status(400).json({ error: "Authentication Failed" });
        } else if (user[0].isEmailVerified === false) {
          console.log(user[0].isEmailVerified);
          verifyEmail.sendVerificationLink(
            req,
            res,
            user[0]._id,
            user[0].email
          );
          return res.json(
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
          res.status(200).json({ messge: "welcom", token: token });
        }
      });
    });
  // next();
};
