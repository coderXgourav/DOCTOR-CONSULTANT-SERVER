const { DepartmentModel } = require("../../models/department");

const addDepartment = async (req, res) => {
  const { name, desc } = req.body;
  if (!name) {
    return res.status(400).json({
      status: false,
      message: "Department Name is required",
      desc: " Please enter department name",
    });
  }
  try {
    const department = new DepartmentModel({
      department: name,
      desc: desc,
    });
    await department.save();
    return res.status(201).json({
      status: true,
      message: "Added Successfully",
      desc: " Department Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: "Internal Error",
      desc: error.message,
    });
  }
};

module.exports = { addDepartment };
