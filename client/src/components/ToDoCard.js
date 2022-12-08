import React from "react";
import axios from "axios";
import {useState} from 'react'
import { useGlobalContext } from "../context/GlobalContext";

const ToDoCard = ({ toDo }) => {
  const [title, setTitle] = React.useState(toDo.title);
  const [desc, setDesc] = React.useState(toDo.desc);
  const [query , setQuery] = useState("Search");

  const [editing, setEditing] = React.useState(false);
  const input = React.useRef(null);
  const { toDoComplete, toDoIncomplete, removeToDo, updateToDo } =
    useGlobalContext();

  const onEdit = (e) => {
    e.preventDefault();

    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setTitle(toDo.title);
     setDesc(toDo.desc);
  };

  const markAsComplete = (e) => {
    e.preventDefault();

    axios.put(`/api/todos/${toDo._id}/complete`).then((res) => {
      toDoComplete(res.data);
    });
  };

  const markAsIncomplete = (e) => {
    e.preventDefault();

    axios.put(`/api/todos/${toDo._id}/incomplete`).then((res) => {
      toDoIncomplete(res.data);
    });
  };

  const deleteToDo = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this ToDo?")) {
      axios.delete(`/api/todos/${toDo._id}`).then(() => {
        removeToDo(toDo);
      });
    }
  };

  const editToDo = (e) => {
    e.preventDefault();

    axios
      .put(`/api/todos/${toDo._id}`, {title , desc})
      .then((res) => {
        updateToDo(res.data);
        setEditing(false);
      })
      .catch(() => {
        stopEditing();
      });
  };

  return (
    <div className={`todo ${toDo.complete ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={toDo.complete}
        onChange={!toDo.complete ? markAsComplete : markAsIncomplete}
      />

      <input
        type="text"
        ref={input}
        value={title}
        readOnly={!editing}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        ref={input}
        value={desc}
        readOnly={!editing}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div className="todo__controls">
        {!editing ? (
          <>
            {!toDo.complete && <button onClick={onEdit}>Edit</button>}
            <button onClick={deleteToDo}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={stopEditing}>Cancel</button>
            <button onClick={editToDo}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
