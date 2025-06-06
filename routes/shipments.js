// routes/shipments.js
const express  = require("express");
const router   = express.Router();
const Joi      = require("joi");
const Shipment = require("../models/Shipment");
const User     = require("../models/User");

// ------------------------------------------------
// 1) PUBLIC: track a shipment by its trackingId
// ------------------------------------------------
router.get("/track/:trackingId", async (req, res, next) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });
    if (!shipment) return res.status(404).json({ error: "Not found" });
    return res.json({ shipment });
  } catch (err) {
    next(err);
  }
});

// ------------------------------------------------
// 2) PUBLIC: create a new shipment (no auth)
// ------------------------------------------------
const createShipmentSchema = Joi.object({
  sender: Joi.object({
    name:    Joi.string().required(),
    address: Joi.string().allow("").optional(),
    phone:   Joi.string().allow("").optional(),
    email:   Joi.string().email().allow("").optional(),
  }).required(),
  recipient: Joi.object({
    name:    Joi.string().required(),
    address: Joi.string().allow("").optional(),
    phone:   Joi.string().allow("").optional(),
    email:   Joi.string().email().allow("").optional(),
  }).required(),
  status:   Joi.string()
               .valid("pending", "in_transit", "delivered", "cancelled")
               .optional(), // ← allow status if present
});

router.post("/", async (req, res, next) => {
  const { error, value } = createShipmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const data = { ...value, createdBy: req.session?.userId || null };
    const shipment = await Shipment.create(data);
    return res.json({ shipment });
  } catch (err) {
    next(err);
  }
});

// ------------------------------------------------
// 3) PUBLIC: fetch a single shipment by its ObjectId
// ------------------------------------------------
router.get("/:id", async (req, res, next) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Not found" });
    return res.json({ shipment });
  } catch (err) {
    next(err);
  }
});

// ------------------------------------------------
// 4) Everything below this line requires “admin”
// ------------------------------------------------
function requireAdmin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  User.findById(req.session.userId)
    .then(me => {
      if (!me || me.role !== "admin") {
        return res.status(403).json({ error: "Admin only" });
      }
      next();
    })
    .catch(err => next(err));
}

router.use(requireAdmin);

const getShipmentListSchema = Joi.object({
  page:   Joi.number().integer().min(1).default(1),
  limit:  Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid("pending", "in_transit", "delivered", "cancelled").optional(),
});

// GET /api/shipments   (paginated + optional filter by “status”)
router.get("/", async (req, res, next) => {
  const { error, value } = getShipmentListSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { page, limit, status } = value;

  try {
    const filter = {};
    if (status) filter.status = status;

    const total = await Shipment.countDocuments(filter);
    const shipments = await Shipment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ shipments, total });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/shipments/:id  (update status, admin only)
const updateShipmentSchema = Joi.object({
  status: Joi.string().valid("pending", "in_transit", "delivered", "cancelled").required(),
});
router.patch("/:id", async (req, res, next) => {
  const { error, value } = updateShipmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { status: value.status },
      { new: true }
    );
    if (!shipment) return res.status(404).json({ error: "Not found" });
    return res.json({ shipment });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/shipments/:id  (delete, admin only)
router.delete("/:id", async (req, res, next) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
