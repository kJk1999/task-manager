const express = require('express');
const cors = require('cors');
const connectDB = require('./server');
const todosRoute = require('./Routes/todosRoute');

const app = express();

// Database connection
connectDB();

// CORS configuration

const corsOptions = {
  origin: 'https://astounding-empanada-9b42dd.netlify.app/', // Replace with the URL of your client app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/api/todoslist', todosRoute);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
