const User = require("../models/User");
const bcrypt = require("bcryptjs")
exports.CreateNewUser = async function (req, res) {
  roles = {
    ADMIN: 1,
    EMPLOYEE: 2,
    USER: 3,
  };
  if (req.body.role == undefined) {
    var role = roles.USER;
  }
  const hashPassword = await bcrypt.hash(req.body.password , 10)
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

  // console.log(req.body)
};
