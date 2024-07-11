import { TbTrash } from "react-icons/tb";
import "../styles/task.css"
import { BsFill0CircleFill } from "react-icons/bs";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

//Typage des objets Task
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
}

//Typage de sprops
interface TaskProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
}

export default function Task({ task, onComplete, onDelete, onEdit}:TaskProps) {
  // Declaration des const pour la gestion du mode d'édition
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  //Gestion du mode d'edition
  const handleEditClick = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setNewTitle(currentTitle);
  };

  const handleSaveClick = (taskId: string) => {
    onEdit(taskId, newTitle);
    setEditingTaskId(null);
    setNewTitle('');
  }
  
  return (
    <div>
      <button className="">
      {task.isCompleted?  <BsFill0CircleFill/> : <div/>}  
      </button>
      <p>{task:title}</p>

      <div key={task.id}>
        {editingTaskId !== task.id ? (
           <> 
          <button onClick={() => handleEditClick(task.id, task.title)}>
            <FaRegEdit />
          </button>
          </>
        ) : ( 
          <>
          <input type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          />
          <button><FaRegEdit/></button>
          </>
        )}
      </div>
      <button>
        <TbTrash onClick={() => onDelete(task.id)} />
      </button>
    </div>
  )
};
