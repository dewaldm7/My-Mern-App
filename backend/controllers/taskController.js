//used express-async-handler package from express; this allows me to use promises without using try - catch

const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

// @desc    Get logged in user Tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

//@description     Create single Task
//@route           GET /api/tasks/create
//@access          Private
const createTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please complete all fields");
  } else {
    const task = new Task({ user: req.user._id, title, content, category });

    const createdTask = await task.save();

    res.status(201).json(createdTask);
  }
});

//@description     Fetch single Task
//@route           GET /api/tasks/:id
//@access          Public
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const task = await Task.findById(req.params.id);
  //make sure the logged in user matches the task user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Action not allowed");
  }

  if (task) {
    task.title = title;
    task.content = content;
    task.category = category;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

//@description     Delete single Task
//@route           GET /api/tasks/:id
//@access          Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Action not allowed");
  }

  if (task) {
    await task.remove();
    res.json({ message: "Task deleted" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});

//admin
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});
//functions are exported to be used in taskRoutes file
module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};
