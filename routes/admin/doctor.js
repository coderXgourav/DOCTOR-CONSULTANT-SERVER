const { Router } = require("express");
const loginVerify = require("../../middleware/loginVerify");
const { addDoctor } = require("../../controllers/admin/doctor");
const doctorRouter = Router();

doctorRouter.post("/add-doctor", loginVerify, addDoctor);

module.exports = { doctorRouter };
