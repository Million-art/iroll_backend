const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const taskRouter = require('./router/TaskRouter');
const remotemployeeRoutes = require('./router/remotEmployeeRouter');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
   }));
app.use(cookieParser());


// Routes
 app.use('/remotemployee', remotemployeeRoutes);
 app.use('/tasks', taskRouter);
// Assuming you have a route like this in your server-side code
 


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
