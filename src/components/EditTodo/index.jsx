import { useState } from "react";
import "./index.css";

const EditTodo = ({ task, updateTodo }) => {
  const { name, id } = task;
  const [value, setValue] = useState(name);
  const [priority, updatePriority] = useState(task.priority);

  const onUpdateTodo = (e) => {
    e.preventDefault();
    updateTodo(value, id, priority);
  };

  return (
    <form onSubmit={onUpdateTodo} className="w-100 mb-2">
      <div className="w-100 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Update Todo"
          value={value}
          className="m-2 todo-input w-100"
          onChange={(e) => setValue(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => updatePriority(e.target.value)}
          className="me-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="btn btn-primary w-25" type="submit">
          Update Todo
        </button>
      </div>
    </form>
  );
};

export default EditTodo;
