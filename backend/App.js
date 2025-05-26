// Import the express module
const express=require('express');
const cors = require('cors');
// Create an instance of the express application
const app=express();

app.use(cors())
// Specify a port number for the server
const port=5000;
// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// use middleware to parse json request bodies
app.use(express.json());

