import { useState, useEffect, useCallback } from "react";
import AddTodo from "../AddTodo";
import EditTodo from "../EditTodo";
import Cookies from "js-cookie";
import "./index.css";

const Todo = () => {
  const token = Cookies.get("jwt_token");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [priority, setpriority] = useState("pending");

  const getData = useCallback(async () => {
    const url = "https://todo-backend-ee4y.onrender.com/todo/todos";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const newData = data.map((each) => ({
          id: each._id,
          name: each.name,
          priority: each.priority,
          edit: each.edit,
        }));
        setTodoList(newData);
      } else {
        console.log("Failed to fetch todos");
      }
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [token, getData]);

  const onEnterInput = (e) => {
    setTodo(e.target.value);
  };

  const onAddTodo = async (e) => {
    e.preventDefault();
    if (todo.trim()) {
      const newTodo = {
        name: todo,
        edit: false,
        priority: priority,
      };
      const url = "https://todo-backend-ee4y.onrender.com/todo/todos";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setTodoList([...todoList, { ...data, id: data._id }]);
      setTodo("");
      setpriority("low");
    }
  };

  const onDeleteTodo = async (id) => {
    const url = `https://todo-backend-ee4y.onrender.com/todo/todos/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    await response.json();
    setTodoList(todoList.filter((each) => each.id !== id));
  };

  const editTodo = (id) => {
    setTodoList(
      todoList.map((each) =>
        each.id === id ? { ...each, edit: !each.edit } : each
      )
    );
  };

  const updateTodo = async (value, id, priority) => {
    const url = `https://todo-backend-ee4y.onrender.com/todo/todos/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: value, priority }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("updated" + { ...data });
    setTodoList(
      todoList.map((each) =>
        each.id === id
          ? { ...each, name: value, edit: !each.edit, priority: priority }
          : each
      )
    );
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vw-100 
      p-3 form-container"
    >
      <div className="todo-container w-50 border border-dark text-center p-3 d-flex flex-column justify-content-center">
        <form onSubmit={onAddTodo}>
          <h1>Add your Task</h1>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="Enter Todo"
              value={todo}
              className="m-2 todo-input p-2 rounded-2 w-50"
              onChange={onEnterInput}
            />
            <select
              value={priority}
              onChange={(e) => setpriority(e.target.value)}
              className="ms-2 priority"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn btn-primary ms-2" type="submit">
              Add Todo
            </button>
          </div>
        </form>
        <ul className="todo-list mt-3">
          {todoList.map((each) =>
            each.edit ? (
              <EditTodo task={each} updateTodo={updateTodo} key={each.id} />
            ) : (
              <AddTodo
                todo={each}
                key={each.id}
                onDelete={onDeleteTodo}
                onEditTodo={editTodo}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
