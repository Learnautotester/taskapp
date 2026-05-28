const TaskForm = ({
  formData,
  handleChange,
  createTask,
}) => {

  return (

    <form
      onSubmit={createTask}
      className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-2xl mx-auto"
    >

      <h2 className="text-2xl font-bold mb-5 text-center">
        Create Task
      </h2>


      <input
        type="text"
        name="title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />


      <textarea
        name="description"
        placeholder="Enter task description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />


      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Add Task
      </button>

    </form>

  );
};

export default TaskForm;