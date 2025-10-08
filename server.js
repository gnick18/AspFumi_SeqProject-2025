// Import the Express library
const express = require('express');
const path = require('path');

// Create an instance of an Express application
const app = express();
const PORT = 3000;

// Define the route for the homepage ("/")
app.get('/', (req, res) => {
  // Sends the index.html file from your project folder
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define the route for the admin page ("/admin")
app.get('/admin', (req, res) => {
  // This tells the server what to do when someone visits /admin
  // For example, send a specific HTML file or just text
  res.send('<h1>Welcome to the Admin Panel!</h1>');
});

// Start the server and listen for requests on port 3000
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});