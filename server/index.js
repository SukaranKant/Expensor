const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT

const app = express();



// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())


function connectToDatabase() {
    try {
     const username = process.env.MONGODB_USERNAME;
     const password = process.env.MONGODB_PASSWORD;
     const dbUrl = process.env.MONGODB_URL;

    mongoose.set("strictQuery", false);
    mongoose.connect(`mongodb+srv://${username}:${password}@${dbUrl}/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();


// Set up a route that responds to a POST request to the '/users' path
app.get('/', (req, res) => {
  res.json({message: 'Welcome'})
  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});