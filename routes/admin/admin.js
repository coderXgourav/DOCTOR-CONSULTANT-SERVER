const express = require("express");
const router = express.Router();
const { addAdmin } = require("../../controllers/admin/doctor");

router.post("/signup", addAdmin);

module.exports = { router };
