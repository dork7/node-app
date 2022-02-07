const express = require("express");

const router = express.Router();
const userRoutes = require("./user.route");
const mailRoutes = require("./mail.route");

/**
 * GET v1/status
 */
router.get("/test", (req, res) => res.send("OK"));

router.use("/users", userRoutes);
router.use("/mail", mailRoutes);

module.exports = router;
