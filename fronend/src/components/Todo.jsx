import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todo.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Todo = ({ todo, fetchData }) => {
  let url = "http://localhost:3000";
  //TOTAL TASKS COMPLETED
  const completedTasks = () => {
    let complete = 0;
    todo.map((item) => {
      if (item.completed === true) {
        complete++;
      }
      return null; // Return null because map expects a return value
    });
    return complete; // Return the count of completed tasks
  };

  ///------------------------------------------------------//
  const [input, setInput] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/api/v1/tasks/${id}`);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(url + `/api/v1/tasks/${id}`);
    if (response.data.success) {
      toast.success("Deleted Successfully!");
      fetchData();
    } else {
      toast.error("Error");
    }
  };
  const handleCreate = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput((input) => ({ ...input, [name]: value }));
  };
  const createTask = async () => {
    const response = await axios.post(url + "/api/v1/tasks", input);
    if (response.data.success) {
      toast.success("Added Successfully!");
      setInput({
        name: "",
      });
      fetchData();
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="container">
      <div className="todo">
        <h3>Todo List App</h3>
        <div className="todo-app">
          <h5>What's the plan for today?</h5>
          <div className="input">
            <input
              type="text"
              value={input.name}
              placeholder="Enter a new task."
              name="name"
              onChange={handleCreate}
            />
            <span>
              <i className="fa-solid fa-plus" onClick={createTask}></i>
            </span>
          </div>
          {todo.map((item, index) => {
            return (
              <div key={index} className="item">
                <p className={item.completed ? "completed" : ""}>
                  {" "}
                  {item.completed === true ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    ""
                  )}
                  {item.name}
                </p>
                <div className="actions">
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleItemClick(item._id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteTodo(item._id)}
                  ></i>
                </div>
              </div>
            );
          })}
          {todo.length !== 0 ? (
            <div className="bottom">
              <p>{` ${completedTasks()} Tasks completed out of ${
                todo.length
              }`}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
