import { TbTrash } from "react-icons/tb";
import "../styles/task.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from "react";
import { FaRegEdit, FaRegSave } from "react-icons/fa";

//Typage des objets Task
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
}

//Typage des Props
interface TaskProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
}

export default function Task({
  task,
  onComplete,
  onDelete,
  onEdit,
}: TaskProps) {
  //Déclaration des const pour la gestion du mode d'édition
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  //Gestion du mode d'édition
  const handleEditClick = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setNewTitle(currentTitle);
  };

  const handleSaveClick = (taskId: string) => {
    onEdit(taskId, newTitle);
    setEditingTaskId(null);
    setNewTitle("");
  };

  return (
    <div className="task">
      <button className="checkContainer" onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.isCompleted ? "textCompleted" : ""}>{task.title}</p>

      <div key={task.id}>
        {editingTaskId !== task.id ? (
          <>
            <button
              className="editButton"
              onClick={() => handleEditClick(task.id, task.title)}
            >
              <FaRegEdit size={22} />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              className="editButton"
              onClick={() => handleSaveClick(task.id)}
            >
              <FaRegSave size={22} />
            </button>
          </>
        )}
      </div>
      <button className="deleteButton" onClick={() => onDelete(task.id)}>
        <TbTrash size={22} />
      </button>
    </div>
  );
}
