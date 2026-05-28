import TaskCard from "./TaskCard";


const TaskList = ({
  tasks,
  deleteTask,
  toggleStatus,
  updateTask
}) => {


       // Empty State
  if (tasks.length === 0) {

    return (

      <div className="bg-white p-10 rounded-xl shadow-md text-center">

        <h2 className="text-2xl font-bold mb-3">
          No Tasks Found
        </h2>
      </div>

    );

  }


  return (

    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {tasks.map((task) => (

        <TaskCard
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
          updateTask={updateTask}
        />

      ))}

    </div>

  );
};

export default TaskList;