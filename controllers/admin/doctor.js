const bcrypt = require("bcrypt");

const { adminModel } = require("../../models/admin");

const addDoctor = async (req, res) => {
  try {
    // Destructure data from request body
    const {
      firstName,
      lastName,
      age,
      gender,
      email,
      mobile,
      specialization,
      experience,
      qualifications,
      license,
      schedule,
      username,
      password,
      about,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      // !age ||
      // !gender ||
      // !email ||
      // !mobile ||
      // !specialization ||
      // !experience ||
      // !qualifications ||
      // !license ||
      !username ||
      !password
      // !about
    ) {
      return res.status(400).json({
        message: "All fields are required",
        desc: "Please fill the all required fields",
      });
    }

    // Check if the email or username already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email_address: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = {
      firstName,
      lastName,
      age,
      gender,
      email,
      mobile,
      specialization,
      experience,
      qualifications,
      // schedule: JSON.parse(schedule),
      about,
    };

    // Create a new doctor user
    const user = new UserModel({
      doctor: newDoctor,
      role: "doctor",
      email_address: email,
      username: username,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      message: "Doctor created successfully",
      doctorId: user._id,
    });
  } catch (error) {
    console.error("Error creating doctor:", error.message);
    return res.status(500).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

const addAdmin = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  try {
    const emailUsernameExist = await adminModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (emailUsernameExist) {
      return res.status(500).json({
        status: false,
        message: "Email or username already exist",
        desc: "Please try a different email or username",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.create({
      first_name: firstname,
      last_name: lastname,
      email,
      username,
      password: hashedPassword,
    });
    return res.status(500).json({
      status: false,
      message: "Admin created",
      desc: "new admin created successfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: error.message, desc: "Internal Error" });
  }
};

module.exports = { addDoctor, addAdmin };
