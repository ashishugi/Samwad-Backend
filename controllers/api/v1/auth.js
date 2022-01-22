const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.index = function (req, res) {
  res.send("<h1>reacher /login page</h1>");
};

module.exports.login = async function (req, res) {
  try {
    console.log("________******_______");
    console.log(req.body);
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        success: false,
        message: "Enter Valid username and password",
      });
    }
    const user = await User.findOne({ email });
    console.log("@login data");
    console.log(user);
    if (user && user.password === password) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      console.log(user.token);
      // user
      res.status(200).json({
        success: true,
        token: token,
      });
      return;
    }
    res.status(200).json({
      success: false,
      message: "Invalid Cridential",
    });
  } catch (err) {
    console.log;
    console.log(err);
  }
};

module.exports.register = async function (req, res) {
  const userData = req.body;
  console.log("reached @register");
  console.log(userData);
  try {
    let user = await User.findOne({ email: userData.email });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User with this email already exist",
      });
    } else {
      console.log("reached here 61");
      user = new User({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });
      await user.save(function (err) {
        if (err) {
          return res.status(200).json({
            success: false,
            message: "Some unexpected error occurred",
            err: err,
          });
        }
        return res.status(200).json({
          success: true,
          message: "User Saved successfully !!!",
          data: {
            user: user,
          },
        });
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
