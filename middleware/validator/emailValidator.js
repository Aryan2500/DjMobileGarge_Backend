const {body , validationResult} = require('express-validator')

exports.emailValidator = [body("email", "enter valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  }
]