const { Schema, model } = require("mongoose");

const PatientSchema = new Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Restricts to predefined values
    },
    age: {
      type: Number,
      min: 0,
      max: 150, // Adds a realistic range for age
    },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Common blood groups
    },
    treatment: { type: String, trim: true },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    address: { type: String, trim: true },
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

const patientModel = model("patient", PatientSchema);

module.exports = { patientModel };
