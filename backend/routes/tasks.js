import exress from "express";
import {
  createTasks,
  deleteTask,
  getAllTaks,
  getTask,
  updateTask,
} from "../controllers/tasks.js";
const router = exress.Router();
router.route("/").get(getAllTaks).post(createTasks);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
export default router;
