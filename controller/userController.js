const User = require("../models/User");
const bcrypt = require("bcryptjs");
const utility = require("../utility/uploadImage");
const jwt = require("jsonwebtoken");

//Create User
exports.CreateNewUser = async function (req, res) {
  roles = {
    ADMIN: 1,
    EMPLOYEE: 2,
    USER: 3,
  };
  if (req.body.role == undefined) {
    var role = roles.USER;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  console.log(role);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: role,
    },
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    }
  );
};

//Upload Avatar
exports.uploadAvatar = (req, res) => {
  utility.UploadImage(req, res, "./public/uploads/avatar/");
  console.log(res.locals.imageName);

  console.log(res.locals.userData);
  User.findOneAndUpdate(
    { _id: res.locals.userData.userId },
    { image: res.locals.imageName },
    { new: true }
  );
};

// Get One User
exports.getUserDetails = (req, res) => {
  
  userDetails=User.findById(res.locals.userData.userId).select(
    "name email image"   ).exec((err , user)=>{
      res.status(200).json(user)
    })
    
};
