const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.index = function (req, res) {
  res.send("<h1>reacher /login page</h1>");
};

module.exports.login = async function (req, res) {
  try {
    console.log('________******_______');
    console.log(req.body)
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
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
      message: 'Invalid Cridential'
    });
  } catch (err) {
    console.log;
    console.log(err);
  }
};

module.exports.register = async function (req, res) {
  const userData = req.body;
  User.findOne({ email: userData.email }, function (err, user) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "something went wrong, Please try again",
      });
    }

    if (!user) {
      User.create(
        {
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
        function (err, user) {
          if (err) {
            return;
          }
          return res.status(200).json({
            success: true,
            message: "User successfully saved!",
          });
        }
      );
    } else {
      res.status(200).json({
        success: true,
        message: "Already User exist with same email",
      });
    }
  });
};
