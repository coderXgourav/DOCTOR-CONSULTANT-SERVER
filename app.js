const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { connectDB } = require("./config/conn");
const port = process.env.PORT || 3000;
const loginRoute = require("./routes/admin/login");
const { departmentRoute } = require("./routes/admin/department");
const { patientRoute } = require("./routes/admin/patient");
const { doctorRouter } = require("./routes/admin/doctor");
const { router } = require("./routes/admin/admin");
const { mainDoctorRouter } = require("./routes/doctor/auth.routes");
const { staffRouter } = require("./routes/staff/auth.routes");

app.use(cors());
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.write("Hello World!");
  res.end();
});

app.use("/", loginRoute);
app.use("/department", departmentRoute);
app.use("/patient", patientRoute);
app.use("/admin", router);
app.use("/admin", doctorRouter);
app.use("/doctor", mainDoctorRouter);
app.use("/staff", staffRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
