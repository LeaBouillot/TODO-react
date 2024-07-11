import { AiOutlinePlusCircle } from "react-icons/ai";
import "../styles/header.css";
import { useState } from "react";
import logoUrl from "../assets/Logo.jpg";

interface HeaderProps {
  onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: HeaderProps) {
  const [title, setTitle] = useState("");
  //FormEvent<HTMLFormElement> will give an array list as HTMLFormControlsCollection
  function handleSumit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddTask(title);
    setTitle(""); // reset input après submit
  }

  return (
    <header>
      <img src={logoUrl} alt="todo logo" />

      <form className="newTaskorm" onSubmit={handleSumit}>
        <input
          type="text"
          placeholder="Ajouter une tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)} //onChangeTitle
        />
        <button>
          Add
          <AiOutlinePlusCircle size={30} />
        </button>
      </form>
    </header>
  );
}
