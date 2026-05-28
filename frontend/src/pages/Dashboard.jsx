/* eslint-disable */
import {
  useEffect,
  useState,
  useContext,
} from "react";

import axiosInstance
  from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContext";

import TaskForm
  from "../components/TaskForm";

import TaskList
  from "../components/TaskList";

import {
  toast
} from "react-toastify";

const Dashboard = () => {

  const { logout, user } = useContext(AuthContext);


  const [tasks, setTasks] =
    useState([]);



  const [filter, setFilter] =
    useState("all");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });


  // Fetch Tasks
  const fetchTasks = async () => {

    try {

      const response =
        await axiosInstance.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchTasks();

  }, []);


  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  // Create Task
  const createTask = async (e) => {

    e.preventDefault();

    // 1. FRONTEND VALIDATION (BEFORE API CALL)
    if (!formData.title || !formData.description) {
      toast.error(
        "Please enter task title and description"
      );
      return;
    }

    try {

      const response =
        await axiosInstance.post(
          "/tasks",
          formData
        );


      setTasks([
        response.data.task,
        ...tasks,
      ]);

      toast.success(
        "Task created"
      );


      setFormData({
        title: "",
        description: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Failed to create task"
      );

    }

  };


  // Delete Task
  const deleteTask = async (id) => {

    try {

      await axiosInstance.delete(
        `/tasks/${id}`
      );


      setTasks(
        tasks.filter(
          (task) => task._id !== id
        )
      );

      toast.success(
        "Task deleted"
      );

    } catch (error) {

      toast.error(

        error.response?.data?.message || "Failed to delete task"
      );

    }

  };


  // Toggle Status
  const toggleStatus = async (task) => {

    try {

      const updatedStatus =
        task.status === "completed"
          ? "pending"
          : "completed";


      const response =
        await axiosInstance.put(
          `/tasks/${task._id}`,
          {
            status: updatedStatus,
          }
        );


      setTasks(
        tasks.map((t) =>
          t._id === task._id
            ? response.data.task
            : t
        )
      );

      toast.success(
        "Task Status updated"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to update task"
      );

    }

  };

  //Update Task
  const updateTask = async (
    id,
    updatedData
  ) => {

    try {

      const response =
        await axiosInstance.put(
          `/tasks/${id}`,
          updatedData
        );


      setTasks(

        tasks.map((task) =>

          task._id === id
            ? response.data.task
            : task

        )

      );

      toast.success(
        "Task edited"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to edit task"
      );

    }

  };

  //Filter task
  const filteredTasks =
    tasks.filter((task) => {

      if (filter === "completed") {

        return task.status === "completed";

      }

      if (filter === "pending") {

        return task.status === "pending";

      }

      return true;

    });

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      <div className="mb-10">

     
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        
        <div className="flex flex-col items-center mt-1">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Task Dashboard
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-1">
            Hello {user?.name || "User"} 👋
          </h2>
        </div>

      </div>

      {/* Task Form */}

      <TaskForm
        formData={formData}
        handleChange={handleChange}
        createTask={createTask}
      />


      {/* Filter Buttons */}

      <div className="flex gap-3 mb-6 justify-center">

        <button
          onClick={() =>
            setFilter("all")
          }
          className={`px-4 py-2 rounded-lg ${filter === "all"
            ? "bg-black text-white"
            : "bg-white"
            }`}
        >
          All
        </button>


        <button
          onClick={() =>
            setFilter("completed")
          }
          className={`px-4 py-2 rounded-lg ${filter === "completed"
            ? "bg-green-600 text-white"
            : "bg-white"
            }`}
        >
          Completed
        </button>


        <button
          onClick={() =>
            setFilter("pending")
          }
          className={`px-4 py-2 rounded-lg ${filter === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-white"
            }`}
        >
          Pending
        </button>

      </div>

      {/* Task List */}

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleStatus={toggleStatus}
        updateTask={updateTask}

      />



    </div>

  );
};

export default Dashboard;