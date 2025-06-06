// routes/setupAdmin.js
const express = require("express");
const router  = express.Router();
const Joi     = require("joi");            // ← ADDED
const User    = require("../models/User");

// -----------------------------------------------------------------
// Define a Joi schema for “setup admin” that requires:
//   • username: alphanumeric, 3–30 chars
//   • email: valid email format
//   • password: minimum 8 characters
// -----------------------------------------------------------------
const setupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


// GET /api/setup-admin
// Only allowed if no users exist yet
router.get("/", async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      return res.json({ allowed: true });
    } else {
      return res.status(404).json({ error: "Already initialized" });
    }
  } catch (err) {
    console.error("Error in GET /api/setup-admin:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// POST /api/setup-admin
// Create the very first admin (only if no users exist).
router.post("/", async (req, res) => {
  // 1) Validate the request body against our Joi schema:
  const { error, value } = setupSchema.validate(req.body);
  if (error) {
    // If validation fails, send back a 400 with Joi's message
    return res.status(400).json({ error: error.details[0].message });
  }
  // At this point, `value` contains { username, email, password } all valid

  try {
    // 2) Check again that no users exist (to avoid race conditions)
    const count = await User.countDocuments();
    if (count > 0) {
      return res.status(403).json({ error: "Setup already completed" });
    }

    // 3) Create the new admin user. Mongoose/User model will hash the password for us.
    const user = await User.create({
      username: value.username,
      email:    value.email,
      password: value.password,
      role:     "admin",
    });

    // 4) Auto‐login by storing userId in session
    req.session.userId = user._id;

    // 5) Return minimal user info
    return res.json({
      success: true,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    console.error("Error in POST /api/setup-admin:", err);

    // If email or username was already taken (duplicate key), send a 400
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res
        .status(400)
        .json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.` });
    }

    // Otherwise, generic server error
    return res.status(500).json({ error: "Server error creating admin" });
  }
});

module.exports = router;
