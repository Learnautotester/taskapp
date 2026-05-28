const Task = require("../models/Task");


//Get Tasks
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });


    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

//Create Tasks
const createTask = async (req, res) => {
  try {

    const { title, description } = req.body;


    const task = await Task.create({
      title,
      description,
      user: req.user.userId,
    });


    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const { title, description, status } = req.body;


    // Find task
    const task = await Task.findOne({
      _id: id,
      user: req.user.userId,
    });


    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    // Update fields
    task.title = title || task.title;

    task.description =
      description || task.description;

    task.status = status || task.status;


    await task.save();


    res.status(200).json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;


    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });


    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};