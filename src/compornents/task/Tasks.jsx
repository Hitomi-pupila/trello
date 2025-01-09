import React from "react";
import { Task } from "./Task";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Tasks = ({ taskList, setTaskList }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id && over?.id && active.id !== over.id) {
      const oldIndex = taskList.findIndex((task) => task.id === active.id);
      const newIndex = taskList.findIndex((task) => task.id === over.id);

      // タスクリストの順序を更新
      const updatedTaskList = arrayMove(taskList, oldIndex, newIndex);
      setTaskList(updatedTaskList);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        className={"sortable"}
        items={taskList.map((task) => task.id)}
      >
        {taskList.map((task) => (
          <div key={task.id}>
            <Task task={task} taskList={taskList} setTaskList={setTaskList} />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
};
