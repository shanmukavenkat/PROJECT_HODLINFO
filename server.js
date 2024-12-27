const express = require('express');
const path = require('path');
const { setupDatabase } = require('./database');
const { startDataFetching } = require('./fetchData');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// API routes
app.use('/api', apiRoutes);

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Initialize database and start server
async function start() {
  await setupDatabase();
  startDataFetching();
  
  app.listen(3000, () => {
    console.log('http://localhost:3000') 
  })
}

start().catch(console.error);