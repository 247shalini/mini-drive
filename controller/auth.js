import User from "./../models/user.js";
import bcrypt from "bcryptjs";

export const loginPage = async (req, res) => {
  return res.render("login/index", {});
};

export const loginAction = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/login");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.redirect("/login");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.redirect("/login");
  }

  req.session.userId = user._id;

  return res.redirect("/");
};

export const signupPage = async (req, res) => {
  return res.render("signup/index", {});
};

export const signupAction = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.redirect("/signup");
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.redirect("/signup");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.redirect("/login");
};
