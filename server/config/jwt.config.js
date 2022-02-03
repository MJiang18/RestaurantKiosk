// const jwt = require("jsonwebtoken");

// module.exports.authenticate = (request, response, next) => {
//   jwt.verify(
//     request.cookies.usertoken,
//     process.env.JWT_SECRET,
//     (err, payload) => {
//       if (err) {
//         response.status(401).json({ verified: false });
//       } else {
//         next();
//       }
//     }
//   );
// };
