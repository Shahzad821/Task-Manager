import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Update from "./components/Update";
import axios from "axios";

const App = () => {
  const url = "http://localhost:3000";
  const [todo, setTodo] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/tasks`);
      if (response.data.success) {
        setTodo(response.data.Task);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully (e.g., show a toast notification)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Pass todo prop to Todo component */}
        <Route path="/" element={<Todo todo={todo} fetchData={fetchData} />} />
        {/* Route for Update component */}
        <Route
          path="/api/v1/tasks/:id"
          element={<Update fetchData={fetchData} />}
        />
      </Routes>
    </div>
  );
};

export default App;
