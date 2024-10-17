const express = require('express');
const router = express.Router();
const RelativeChatID = require('../models/RelativeChatID');

// ดึงข้อมูลญาติผู้ป่วยตาม patient_id
router.get('/patients/:patient_id/relatives', async (req, res) => {
  const { patient_id } = req.params;
  try {
    const relatives = await RelativeChatID.findAll({
      where: { patient_id }
    });
    res.status(200).json(relatives);
  } catch (error) {
    console.error('Error fetching relatives:', error);
    res.status(500).json({ message: 'มีข้อผิดพลาดในการดึงข้อมูลญาติ', error });
  }
});

// เส้นทางสำหรับการบันทึกข้อมูลญาติ (ยังคงเหมือนเดิม)
router.post('/relative-chat', async (req, res) => {
  try {
    const { telegramID, patient_id, firstName, lastName, phone, role, email } = req.body;

    const newRelativeChatID = await RelativeChatID.create({
      telegramID,
      patient_id,
      firstName,
      lastName,
      phone,
      role,
      email
    });

    res.status(201).json(newRelativeChatID);
  } catch (error) {
    console.error('Error saving relative chat ID:', error);
    res.status(500).json({ message: 'มีข้อผิดพลาดในการบันทึกข้อมูล', error });
  }
});

module.exports = router;
