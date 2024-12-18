const { Schema, model } = require("mongoose");

const DoctorSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  email: { type: String },
  mobile: { type: String },
  profilePhoto: { type: String }, // URL or file path for the profile photo
  specialization: { type: String },
  experience: { type: Number }, // In years
  qualifications: { type: String },
  license: { type: String },
  schedule: {
    sun: { start: { type: String }, end: { type: String } },
    mon: { start: { type: String }, end: { type: String } },
    tue: { start: { type: String }, end: { type: String } },
    wed: { start: { type: String }, end: { type: String } },
    thu: { start: { type: String }, end: { type: String } },
    fri: { start: { type: String }, end: { type: String } },
    sat: { start: { type: String }, end: { type: String } },
  },
  about: { type: String, maxlength: 1000 },
});

const doctorModel = model("doctor", DoctorSchema);

module.exports = {doctorModel};
