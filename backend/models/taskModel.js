import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
