
import { useState } from "react";

const TaskCard = ({
  task,
  deleteTask,
  toggleStatus,
  updateTask,
}) => {
  const [isEditing, setIsEditing] =
    useState(false);


  const [editData, setEditData] =
    useState({
      title: task.title,
      description: task.description,
    });

  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]:
        e.target.value,
    });

  };


  const saveEdit = () => {

    updateTask(task._id, editData);

    setIsEditing(false);

  };

  return (

    <div className="bg-white p-5 rounded-xl shadow-md ">

      {isEditing ? (

        <>
          {/* Edit Title */}

          <label className="block text-sm font-medium text-gray-700 mb-1 wrap-break-words whitespace-pre-wrap">
            Edit Title
          </label>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />


          {/* Edit Description */}
          <label className="block text-sm font-medium text-gray-700 mb-1 ">
            Edit Description
          </label>
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg mb-4"
          />


          {/* Edit Buttons */}

          <div className="flex gap-2">

            <button
              onClick={saveEdit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Save
            </button>


            <button
              onClick={() =>
                setIsEditing(false)
              }
              className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>

          </div>

        </>

      ) : (

        <>
          {/* Title */}

          <div className="mb-3">

            <p className="text-sm text-gray-500">
              Title
            </p>

            <h2 className="text-xl font-bold">
              {task.title}
            </h2>

          </div>


          {/* Description */}

          <div className="mb-4">
          
            <p className="text-sm text-gray-500">
              Description
            </p>
    
            <p className="text-gray-700  wrap-break-word  whitespace-pre-wrap">
              {task.description}
            </p>

          </div>


          {/* Status */}

          <div className="mb-5">

            <span className="text-sm text-gray-500">
              Status:
            </span>

            <span
              className={`ml-2 font-bold ${task.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-600"
                }`}
            >
              {task.status}
            </span>

          </div>


          {/* Buttons */}

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() =>
                toggleStatus(task)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              {task.status === "completed"
                ? "Pending"
                : "Complete"}
            </button>


            <button
               onClick={() => {
              setEditData({
                title: task.title,
                description: task.description,
              });
              setIsEditing(true);
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
            >
              Edit
            </button>


            <button
              onClick={() =>
                deleteTask(task._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>

          </div>

        </>

      )}
    </div>

  );
};

export default TaskCard;