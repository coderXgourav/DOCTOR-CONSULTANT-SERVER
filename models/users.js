const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { timestamps: true }
);
const DoctorSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { timestamps: true }
);

const PatientSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    gender: { 
      type: String, 
      required: true, 
      enum: ["Male", "Female", "Other"], // Restricts to predefined values
    },
    age: { 
      type: Number, 
      required: true, 
      min: 0, 
      max: 150, // Adds a realistic range for age
    },
    blood_group: { 
      type: String, 
      required: true, 
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Common blood groups
    },
    treatment: { type: String, required: true, trim: true },
    mobile: { 
      type: String, 
      required: true, 
    
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
    
    },
    address: { type: String, required: true, trim: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const UserSchema = new Schema({
  admin: { type: AdminSchema },
  doctor: { type: DoctorSchema },
  patient: { type: PatientSchema },
  role: { type: String, enum: ["patient", "doctor", "admin"] },
  email_address: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model("users", UserSchema);

const PatientModel = model("patients", PatientSchema);

module.exports = {UserModel, PatientModel};
