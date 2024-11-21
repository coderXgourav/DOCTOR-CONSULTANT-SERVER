const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { connectDB } = require("./config/conn");
const port = process.env.PORT || 3000;
const loginRoute = require("./routes/login");
const { departmentRoute } = require("./routes/admin/department");

connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.write("Hello World!");
  res.end();
});

app.use(cors());
app.use("/", loginRoute);
app.use("/department", departmentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
