const express = require("express");

const router = express.Router();
const userRoutes = require("./user.route");
const mailRoutes = require("./mail.route");
const jwtRoutes = require("./jwt.route");
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const { authorize } = require("../middlewares/auth.middleware");

/**
 * GET v1/status
 */
router.get("/test", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/jwt", jwtRoutes);
router.use("/users", userRoutes);
router.use("/mail", mailRoutes);
router.use("/product", authorize, productRoutes);

module.exports = router;
