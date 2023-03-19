const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


//register endpoint
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "password must be 5 charecters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const confirm = await User.find({
      Username: req.body.username,
      email: req.body.email,
    });
    confirm && res.status(400).json("this user or email exist");
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const savedPost = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      const resultPost = await savedPost.save();
      res.status(200).json(resultPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
//login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong user");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("wrong password");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
