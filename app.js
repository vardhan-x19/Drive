const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const homeRouter=require('./routes/home')
const cookieParser = require('cookie-parser');

dotenv.config(); // Load environment variables

const app = express();


app.use(cookieParser())
// Connect to the database
connectToDB();


// Set up middleware
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON request bodies

// Define routes
app.use(homeRouter);
app.use('/user', userRouter);

app.use('/', (req, res) => {
  res.send('Hi, this is the home page');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
