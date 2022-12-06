const express = require("express");
const dotenv = require("dotenv").config(); //call .config() to allow storing of variables in .env file
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cors = require("cors");
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(cors());

//call function to connect to MongoDB database
connectDB();

//middleware allows use of body data
app.use(express.json());

//routes imported from userRoutes and taskRoutes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//error handler middleware executed during request and response
app.use(notFound);
app.use(errorHandler);

//process.env.PORT allows access to the variable stored in .env file
const PORT = process.env.PORT || 5000;

//server listening on port 5000
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
