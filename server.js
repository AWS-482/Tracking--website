const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Attendance = require('./models/Attendance');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mark attendance
app.post('/attendance', async (req, res) => {
  const { name } = req.body;
  const attendance = new Attendance({ name });
  await attendance.save();
  res.json(attendance);
});

// Get all attendance
app.get('/attendance', async (req, res) => {
  const records = await Attendance.find().sort({ date: -1 });
  res.json(records);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));