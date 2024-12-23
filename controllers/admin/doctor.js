const bcrypt = require("bcrypt");

const { adminModel } = require("../../models/admin");
const { doctorModel } = require("../../models/doctor");

// const addDoctor = async (req, res) => {
//   try {
//     // Destructure data from request body
//     const {
//       firstName,
//       lastName,
//       age,
//       gender,
//       email,
//       mobile,
//       specialization,
//       experience,
//       qualifications,
//       license,
//       schedule,
//       username,
//       password,
//       about,
//     } = req.body;

//     console.log("res.bodyyy",req.body)

//     if (
//       !firstName ||
//       !lastName ||
//       // !age ||
//       // !gender ||
//       // !email ||
//       // !mobile ||
//       // !specialization ||
//       // !experience ||
//       // !qualifications ||
//       // !license ||
//       !username ||
//       !password
//       // !about
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//         desc: "Please fill the all required fields",
//       });
//     }

//     // Check if the email or username already exists
//     const existingUser = await doctorModel.findOne({
//       $or: [{ email_address: email }, { username: username }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email or username already exists.",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newDoctor = {
//       firstName,
//       lastName,
//       age,
//       gender,
//       email,
//       mobile,
//       specialization,
//       experience,
//       qualifications,
//       // schedule: JSON.parse(schedule),
//       about,
//     };

//     // Create a new doctor user
//     const user = new doctorModel({
//       doctor: newDoctor,
//       role: "doctor",
//       email_address: email,
//       username: username,
//       password: hashedPassword,
//     });
//     await user.save();

//     return res.status(201).json({
//       message: "Doctor created successfully",
//       doctorId: user._id,
//     });
//   } catch (error) {
//     console.error("Error creating doctor:", error.message);
//     return res.status(500).json({
//       message: "Failed to create doctor",
//       error: error.message,
//     });
//   }
// };

const addDoctor = async (req, res) => {
  try {
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
      !gender ||
      !email ||
      !mobile ||
      !username

      // !specialization ||
      // !experience ||
      // !qualifications ||
      // !license ||
      // !schedule ||
      // !password ||
      // !about
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
        desc: "Please fill the all required fields",
      });
    }

    // Check for duplicate email or username
    const existingUser = await doctorModel.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email or username already exists.",
        desc: " Please use a different email or username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse schedule if it's sent as a string
    const parsedSchedule =
      typeof schedule === "string" ? JSON.parse(schedule) : schedule;

    // Create the doctor
    const user = new doctorModel({
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
      schedule: parsedSchedule,
      about,
      username,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      status: true,
      message: "Doctor created successfully",
      doctorId: user._id,
      status: true, // Make sure this is true for success
      desc: "Doctor profile has been created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to create doctor",
      error: error.message,
      status: false,
      desc: "Oops! Something went wrong. Please try again later.",
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

const getAllDoctors = async (req, res) => {
  try {
    // Optional: Pagination query parameters (page, limit)
    const { page = 1, limit = 10 } = req.query;

    // Calculate the skip and limit for pagination
    const skip = (page - 1) * limit;
    const doctors = await doctorModel
      .find()
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Count the total number of doctors for pagination info
    const totalDoctors = await doctorModel.countDocuments();

    // Return the doctors and pagination info
    return res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors,
      pagination: {
        totalDoctors,
        currentPage: page,
        totalPages: Math.ceil(totalDoctors / limit),
      },
      status: true,
      desc: "List of doctors fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    return res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
      status: false,
      desc: "Oops! Something went wrong. Please try again later.",
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find the doctor by ID and remove it
    const doctor = await doctorModel.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Return success response
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting doctor" });
  }
};

module.exports = { addDoctor, addAdmin, getAllDoctors, deleteDoctor };
