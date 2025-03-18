
const jwt = require("jsonwebtoken");

const isAuthorised = async (req, res, next) => {
  try {
    // const {token} = req.query;
    const {token} = req.cookies;

    if (!token) {
      return res.render("login" , {errorMessage : "Unauthorized Kindly login again!"});
    }
    const secretkey = process.env.SECRET_KEY;

     jwt.verify(token, secretkey, (reject, resolve) => {
      if (reject) {
        return res.render("login" , {errorMessage : "Forbidden , Kindly Try after sometime !"});
      }

      req.userId = resolve.userId;

      next();
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { isAuthorised };
