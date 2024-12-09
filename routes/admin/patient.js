const { Router } = require("express");
const { addPatient, deletePatient, updatePatient, getAllPatient } = require("../../controllers/admin/patientController");
const loginVerify = require("../../middleware/loginVerify");

const patientRoute = Router();

patientRoute.post("/add-patient", addPatient)

patientRoute.delete("/delete-patient/:id",loginVerify, deletePatient)

patientRoute.put("/update-patient/:id",loginVerify, updatePatient)

patientRoute.get("/get-patient",loginVerify, getAllPatient)






module.exports = { patientRoute };