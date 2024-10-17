const express = require('express');
const router = express.Router();
const Patient = require('../models/Users'); // ใช้ Model Patient
const RelativeChatID = require('../models/RelativeChatID'); // ใช้ Model RelativeChatID

// Route เพื่อดึงข้อมูลผู้ป่วยทั้งหมด
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'มีข้อผิดพลาดในการดึงข้อมูลผู้ป่วย', error });
  }
});


module.exports = router;
