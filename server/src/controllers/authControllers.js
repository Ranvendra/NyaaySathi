const { signupService, loginService } = require("../services/authServices");
const { generateToken } = require("../utils/jwt");

async function signupController(req, res) {
  try {
    const user = await signupService(req.body);
    return res.status(201).json({ message: "Signup Successful.", user });
  } catch (err) {
    return res.status(409).json({ error: err.message });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginService({ email, password });

    const token = generateToken(user);

    const isProduction =
      process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: "Login Success.", user });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

module.exports = { signupController, loginController };
