const express = require('express');
const cors = require('cors');
const connectDB = require('./server');
const todosRoute = require('./Routes/todosRoute');
const dotenv = require('dotenv')
const singninRoute = require('./Routes/SigninRoute')
const singnupRoute = require("./Routes/SignupRoute")

dotenv.config()

const app = express();

// Database connection
connectDB();

// CORS configuration

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/api/todoslist', todosRoute);
app.use('/api/signup',singnupRoute)
app.use('/api/signin',singninRoute)

// Start server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
