import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({ task, taskList, setTaskList }) => {
  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="taskBox"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <p className="taskText">{task.text}</p>
        <button
          className="taskTrashButton"
          onClick={() => handleDelete(task.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </>
  );
};
