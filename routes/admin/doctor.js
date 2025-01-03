const { Router } = require("express");
const loginVerify = require("../../middleware/loginVerify");
const {
  addDoctor,
  getAllDoctors,
  deleteDoctor,
} = require("../../controllers/admin/doctor");
const doctorRouter = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// doctorRouter.post(
//   "/add-doctor",
//   loginVerify,
//   upload.single("photo"),
//   addDoctor
// );

doctorRouter.post("/add-doctor", loginVerify, addDoctor);
doctorRouter.get("/get-doctor", loginVerify, getAllDoctors);
doctorRouter.delete("/delete-doctor/:id", loginVerify, deleteDoctor);

module.exports = { doctorRouter };
