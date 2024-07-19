import TaskModel from "../models/taskModel.js";
const getAllTaks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.json({ success: true, Task: tasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
const createTasks = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.json({ success: true, Task: task });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await TaskModel.findById({ _id: taskId });
    if (!task) {
      res.json({ success: false, message: `No task with id ${id}` });
    }
    res.json({ success: true, Task: task });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await TaskModel.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.json({ success: false, message: `No task with id${Id}` });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await TaskModel.findByIdAndDelete({ _id: taskId });
    if (!task) {
      res.json({ success: false, message: `No task with id${Id}` });
    }
    res.json({ success: true, message: "Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
export { getAllTaks, createTasks, getTask, updateTask, deleteTask };
