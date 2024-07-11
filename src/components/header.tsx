import { AiOutlinePlusCircle } from "react-icons/ai";
import "../styles/header.css";
import { useState } from "react";
import logoUrl from "../assets/Logo.svg";

//Typage des Props
interface HeaderProps {
  onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: HeaderProps) {
  const [title, setTitle] = useState("");

  //Gestion du submit du formulaire
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAddTask(title);
    setTitle("");
  }

  //Gestion de la saisie du titre
  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <header className="header">
      <img src={logoUrl} alt="todo logo" />

      <form className="newTaskForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task"
          value={title}
          onChange={onChangeTitle}
        />
        <button>
          Add
          <AiOutlinePlusCircle size={30} />
        </button>
      </form>
    </header>
  );
}
