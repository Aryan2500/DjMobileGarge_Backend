const { body, validationResult, check } = require("express-validator");
const User = require("../../models/User");

// Check Email is Already Existing
findUserByEmail = function (email, callback) {
  var query = User.find({ email: email }, (err, data) => {
    return data;
  });

  return query.then(function (results) {
      return results[0];
    }).catch(function (err) {
      throw err;
    });
};

// User Data Validation
exports.validateUser = [
  body("name", "enter your name").notEmpty(),
  body("email").custom((value) => {
    return findUserByEmail(value).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  check("password", "password cannot be empty").notEmpty(),
  check("password", "password should be 5 character long").isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(409).json({ errors: errors.array() });
    next();
  },
];
