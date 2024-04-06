import { React, useState } from "react";

import "./styles.css";

const App = () => {
  //--------- single todo states ----------
  const [todo, setTodo] = useState("");
  //------- list of todos state------------
  const [todos, setTodos] = useState([]);
  //--------- editid state ---------------
  const [editid, setEditid] = useState(0);

  //----------------- Add and update Todo single itesm in todoList ---------
  const handleSubmit = (e) => {
    e.preventDefault();
    //--------- update -------------
    if (editid) {
      const editTodo = todos.find((i) => i.id === editid);
      const updateTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );

      setTodos(updateTodos);
      setEditid(0);
      setTodo("");
      return;
    }

    //--------- add ----------
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
    }
    setTodo("");
  };

  //--------------- delete function----------------
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  //------------------- edit function (brind selected in input box) ---------------
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditid(id);
  };

  //--------------- return function ----------------
  return (
    <div className="App">
      <div className="container">
        <h2>Todo List App</h2>
        <form className="todoform" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editid ? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo" key={t.id}>
              <span className="TodoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
