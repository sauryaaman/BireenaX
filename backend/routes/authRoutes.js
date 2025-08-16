const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { signup, login ,getAdminProfile } = require("../controllers/authController");


router.post("/signup", signup);
router.post("/login", login);
router.get("/getAdminProfile",protect,getAdminProfile);




module.exports = router;
