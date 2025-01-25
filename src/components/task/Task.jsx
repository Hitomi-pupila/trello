import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, taskList, setTaskList, index }) => {
  const [isEditing, setIsEditing] = useState(false); // 編集状態の管理
  const [newText, setNewText] = useState(task.text); // 新しいテキストの状態

  const handleDelete = (id) => {
    const updatedTasks = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks)); // ローカルストレージに保存
  };

  const handleEdit = () => {
    setIsEditing(true); // 編集モードを有効にする
  };

  const handleSave = () => {
    const updatedTasks = taskList.map((t) =>
      t.id === task.id ? { ...t, text: newText } : t
    );
    setTaskList(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks)); // ローカルストレージに保存
    setIsEditing(false); // 編集モードを無効にする
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // エンターキーが押された場合、保存処理を実行
    }
  };

  return (
    <Draggable index={index} draggableId={task.draggableId}>
      {(provided) => (
        <div
          className="taskBox"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={handleKeyDown} // エンターキーを監視
                title="タスクの内容を編集"
                className="taskEditInput"
              />
              <button
                className="taskSaveButton"
                onClick={handleSave}
                aria-label="保存"
              >
                <i className="fas fa-save"></i>
              </button>
            </>
          ) : (
            <>
              <p className="taskText">{task.text}</p>
              <div className="taskButtons">
                <button
                  className="taskEditButton"
                  onClick={handleEdit}
                  aria-label="編集"
                >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  className="taskTrashButton"
                  onClick={() => handleDelete(task.id)}
                  aria-label="削除"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};
