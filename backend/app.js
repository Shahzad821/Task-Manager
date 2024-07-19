import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import "dotenv/config";
import router from "./routes/tasks.js";
import db from "./config/db/connect.js";
//middleware
app.use(express.static("./public"));
app.use(express.json());
//Routes
app.use(cors());
app.use("/api/v1/tasks", router);
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
