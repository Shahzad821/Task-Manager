import React, { useEffect, useState } from "react";
import "./update.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ fetchData }) => {
  const url = "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();

  // State for the item
  const [item, setItem] = useState({
    _id: "",
    name: "",
    completed: false,
  });

  // Fetch single todo item
  const getTodo = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/tasks/${id}`);
      if (response.data.success) {
        setItem(response.data.Task);
      }
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  // Update item fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setItem((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  // Update todo item
  const updateTodo = async () => {
    try {
      const response = await axios.patch(`${url}/api/v1/tasks/${id}`, item);
      console.log("Update response:", response.data);
      toast.success("Updated successfully!");
      // Optionally handle success response
      // Navigate back to tasks page after update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
    fetchData();
  };

  // Navigate back to tasks page
  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    getTodo();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container">
      <div className="todo">
        <h3>Edit Todo</h3>
        <div className="todo-app">
          <div className="details">
            <div className="flex">
              <span>ID:</span> <p className="left">{item._id}</p>
            </div>
            <div className="flex">
              <span>Name:</span>
              <input
                type="text"
                name="name"
                value={item.name}
                className="left"
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <span>Completed:</span>
              <input
                type="checkbox"
                name="completed"
                checked={item.completed}
                className="checkbox"
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="Edit" onClick={updateTodo}>
            Edit
          </button>
        </div>
        <button className="back" onClick={handleNavigate}>
          Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default Update;
