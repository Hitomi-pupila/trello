import React, { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// 並び替え関数
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const TaskCards = () => {
  // 状態の初期化
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
    if (taskCardsList.length > 0) {
      localStorage.setItem("taskCardsList", JSON.stringify(taskCardsList));
    }
  }, [taskCardsList]);

  // ドラッグ終了時の処理
  const handleDragEnd = (result) => {
    if (!result.destination) return; // ドロップ先が無い場合は何もしない

    // 並び替えを行い、新しい配列を状態に設定
    const reorderedList = reorder(
      taskCardsList,
      result.source.index,
      result.destination.index
    );
    setTaskCardsList(reorderedList); // 新しいリストで状態を更新
  };

  // 新しいカードを追加する処理
  const handleAddTaskCard = () => {
    const newTaskCard = {
      id: `${taskCardsList.length}`,
      draggableId: `item${taskCardsList.length}`,
    };

    setTaskCardsList((prevTaskCards) => [...prevTaskCards, newTaskCard]);
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
              handleAddTaskCard={handleAddTaskCard} // 新しいタスクカードを追加する関数を渡す
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
