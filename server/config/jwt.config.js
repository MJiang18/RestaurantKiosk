const jwt = require("jsonwebtoken");
const secret = "I can't believe this key is so secret";

module.exports.secret = secret;
module.exports.authenticate = (request, response, next) => {
  jwt.verify(
    request.cookies.usertoken,
    process.env.SECRET_KEY,
    (err, payload) => {
      if (err) {
        response.status(401).json({ verified: false });
      } else {
        next();
      }
    }
  );
};
