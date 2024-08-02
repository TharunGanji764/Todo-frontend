import "./index.css";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
const AddTodo = ({ todo, onDelete, onEditTodo }) => {
  const { id, name, priority } = todo;
  return (
    <li className="todo-item">
      <p className="text w-75">{name}</p>
      <p className="w-25">
        <span>{priority} Priority</span>
      </p>
      <div className="d-flex w-25 justify-content-evenly align-items-center">
        <TbEdit size={25} onClick={() => onEditTodo(id)} />
        <MdOutlineDelete size={25} onClick={() => onDelete(id)} />
      </div>
    </li>
  );
};

export default AddTodo;
