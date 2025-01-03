const { Router } = require("express");
const {
  addDepartment,
  allDepartments,
  deleteDepartment,
} = require("../../controllers/admin/department");
const departmentRoute = Router();

departmentRoute.post("/add", addDepartment);
departmentRoute.get("/all-department", allDepartments);
departmentRoute.delete("/delete-department/:departmentId", deleteDepartment);

module.exports = { departmentRoute };
