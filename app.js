const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors({
  origin: ['https://lays-configurator-tdd.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

const defaultRoutes = require('./routes/v1/default');
const adminRoutes = require('./routes/v1/admin');

// routes: auth, user profile, flavour, voting, flavour submission, admin (flavour managament && submissions + votes)

app.use('/api/v1/default', defaultRoutes);
app.use('/api/v1/admin', adminRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});