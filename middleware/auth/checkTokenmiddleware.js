const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.headers.authorization == undefined){
        return res.status(400).json({
            error : "token missing {authorization failed}"
        })
    }
  token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    res.locals.userData = decode;
    console.log(req.userData);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
