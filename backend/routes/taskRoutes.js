//taskRoutes are exported to server.js
//getTasks, createTask, updateTask, getTaskById and deleteTask functions are imported from taskController

const express = require("express");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");
//protect middleware to protect routes imported from authmiddleware
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//get tasks route
router.route("/").get(protect, getTasks);
//create tasks route
router.route("/create").post(protect, createTask);
//getTaskById, updateTask and deleteTask route
router
  .route("/:id")
  .get(getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
