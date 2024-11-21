const { Router } = require("express");
const { addDepartment } = require("../../controllers/admin/department");
const departmentRoute = Router();

departmentRoute.post("/add", addDepartment);

module.exports = { departmentRoute };
