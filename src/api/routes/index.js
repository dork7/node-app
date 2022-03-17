const express = require("express");

const router = express.Router();
const userRoutes = require("./user.route");
const mailRoutes = require("./mail.route");
const jwtRoutes = require("./jwt.route");
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const imageRoute = require("./image.route");
const smsRoute = require("./sms.route");
const sseRoute = require("./sse.route");
const redisRoute = require("./redis.route");
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
router.use("/image", imageRoute);
router.use("/sms", smsRoute);
router.use("/sse", sseRoute);
router.use("/redis", redisRoute);

module.exports = router;
