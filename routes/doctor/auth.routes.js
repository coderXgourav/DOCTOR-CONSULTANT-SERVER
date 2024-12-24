const express = require("express");
const { addDoctor } = require("../../controllers/admin/doctor");
const { loginDoctor } = require("../../controllers/doctor/auth.controller");
const mainDoctorRouter = express.Router();

mainDoctorRouter.post("/signup", addDoctor);
mainDoctorRouter.post("/login", loginDoctor);

module.exports = { mainDoctorRouter };
