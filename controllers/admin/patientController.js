const { PatientModel } = require("../../models/users");

const addPatient = async (req, res) => {
    try {
        const { first_name, last_name, gender, age, blood_group, treatment, mobile, email, address } = req.body;
    
        // Validate required fields
        if (!first_name || !last_name || !gender || !age || !blood_group || !treatment || !mobile || !email || !address) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        // Create a new patient
        const patient = new PatientModel({
          first_name,
          last_name,
          gender,
          age,
          blood_group,
          treatment,
          mobile,
          email,
          address,
        });
    
        await patient.save();
    
        res.status(201).json({
          message: "Patient created successfully",tittle: "Success",
          data: patient,
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ message: "Email or mobile number already exists" });
        }
        res.status(500).json({ message: error.message });
      }
}

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Find and delete the patient
        const deletedPatient = await PatientModel.findByIdAndDelete(id);
    
        if (!deletedPatient) {
          return res.status(404).json({ message: "Patient not found" });
        }
    
        res.status(200).json({
          message: "Patient deleted successfully",
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
    
        // Find and update the patient
        const updatedPatient = await PatientModel.findByIdAndUpdate(id, updates, { new: true });
    
        if (!updatedPatient) {
          return res.status(404).json({ message: "Patient not found" });
        }
    
        res.status(200).json({
          message: "Patient updated successfully",
          data: updatedPatient,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getAllPatient = async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).json({
          message: "Patients retrieved successfully",
          data: patients,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getSinglePatient = async (req, res) => {
    try {
        const { id } = req.params;
    
        const patient = await PatientModel.findById(id);
    
        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }
    
        res.status(200).json({
          message: "Patient retrieved successfully",
          data: patient,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}



module.exports={addPatient,deletePatient, updatePatient, getAllPatient, getSinglePatient }