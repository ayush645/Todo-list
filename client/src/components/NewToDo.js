import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const NewToDo = () => {
  const { addToDo } = useGlobalContext();
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");


  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/todos/new", { title, desc } ).then((res) => {
      setTitle("");
      setDesc("");
      addToDo(res.data);
    });
  };

  return (
    <form className="new" onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder = "Title"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder = "Description"

      />

      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default NewToDo;
