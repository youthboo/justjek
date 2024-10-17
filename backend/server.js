const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db'); 
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes'); 
const messageRoutes = require('./routes/messageRoutes'); 
const telegramIDRoutes = require('./routes/telegramID');
const relativeRoutes = require('./routes/relativeRoutes'); // เพิ่มการนำเข้า relativeRoutes

const app = express();

// Middleware
app.use(cors({
    origin: '*',  
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/telegram', telegramIDRoutes); 
app.use('/api/relative', relativeRoutes); // เพิ่มเส้นทางสำหรับ relativeRoutes.js

// Sync the database
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch((error) => console.error('Error synchronizing database:', error));

// Start the server
const PORT = process.env.PORT || 3008;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
