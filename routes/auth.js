// routes/auth.js
const express = require("express");
const router  = express.Router();
const Joi     = require("joi");                 // ← ADDED
const User    = require("../models/User");

// Rate-limit login specifically:
const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                    // limit each IP to 5 login attempts per window
  message: { error: "Too many login attempts. Please try again later." },
});

// Joi schema for login:
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// POST /api/auth/login
router.post("/login", loginLimiter, async (req, res, next) => {
  // 1. Validate payload
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = value;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const matched = await user.comparePassword(password);
    if (!matched) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. Set session
    req.session.userId = user._id;

    // 3. Send minimal user info
    res.json({
      success: true,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/logout
router.post("/logout", async (req, res, next) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

// GET /api/auth/me
router.get("/me", async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
