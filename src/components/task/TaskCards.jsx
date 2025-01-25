import React, { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  // 新しい配列を作成して並び替える
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([]);

  // コンポーネントの初回レンダリング時に localStorage からデータを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem("taskCardsList");
    if (savedData) {
      setTaskCardsList(JSON.parse(savedData));
    } else {
      // 初期データを設定（必要なら変更）
      setTaskCardsList([
        {
          id: "0",
          draggableId: "item0",
        },
      ]);
    }
  }, []);

  // taskCardsList が変更されるたびに localStorage に保存
  useEffect(() => {
    localStorage.setItem("taskCardsList", JSON.stringify(taskCardsList));
  }, [taskCardsList]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = reorder(
      taskCardsList,
      result.source.index,
      result.destination.index
    );

    setTaskCardsList(reorderedList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="taskCardsArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskCardsList.map((taskCard, index) => (
              <TaskCard
                key={taskCard.id}
                index={index}
                taskCardsList={taskCardsList}
                setTaskCardsList={setTaskCardsList}
                taskCard={taskCard}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton
              taskCardsList={taskCardsList}
              setTaskCardsList={setTaskCardsList}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
