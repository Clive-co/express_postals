// routes/users.js
const express = require("express");
const router  = express.Router();
const Joi     = require("joi");                 
const User    = require("../models/User");

// Middleware: admin only
router.use(async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const me = await User.findById(req.session.userId);
  if (!me || me.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
});

// Joi schema for creating a new user
const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin", "user").required(),
});

// GET /api/users — list all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("username email role createdAt");
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

// POST /api/users — create a new user
router.post("/", async (req, res, next) => {
  // 1. Validate incoming payload
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, email, password, role } = value;
  try {
    const user = await User.create({ username, email, password, role });
    return res.json({
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    // Handle duplicate‐key (11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.` });
    }
    next(err);
  }
});

// DELETE /api/users/:id — delete a user
router.delete("/:id", async (req, res, next) => {
  try {
    if (req.params.id === String(req.session.userId)) {
      return res.status(400).json({ error: "Cannot delete yourself" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
