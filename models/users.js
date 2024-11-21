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
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { timestamps: true }
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
module.exports = UserModel;
