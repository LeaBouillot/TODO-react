import "../styles/tasks.css";
import Task from "./task";
import { useState } from "react";

//Typage des objets Tasks
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
}

//Typage des Props
interface TasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
  choice: string;
}

export default function Tasks({
  tasks,
  onComplete,
  onDelete,
  onEdit,
  choice,
}: TasksProps) {
  // Filtrer les tâches par catégorie
  const filteredTasksByCate =
    choice === "All" ? tasks : tasks.filter((task) => task.category === choice);

  // Filtrer les tâches par champ de recherche
  const [searchTerm, setSearchTerm] = useState("");

  //Gestion du comptage de task complétés et non complétés
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <>
      <section className="tasks">
        <header className="tasks_header">
          <div>
            <p>Create Tasks</p>
            <span>{tasksQuantity}</span>
          </div>

          <div>
            <p className="textPurple">Completed Tasks</p>
            <span>
              {completedTasks} of {tasksQuantity}
            </span>
          </div>
        </header>

        <form className="searchForm">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="list">
          {filteredTasksByCate
            .filter((item) => {
              return item.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
        </div>
      </section>
    </>
  );
}
