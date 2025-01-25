import React, { useState, useEffect } from "react";

export const TaskCardTitle = ({ cardId }) => {
  const [isClick, setIsClick] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState("");

  // 初期タイトルをlocalStorageから読み込む
  useEffect(() => {
    const savedTitle = localStorage.getItem(`title-${cardId}`);
    if (savedTitle) {
      setInputCardTitle(savedTitle);
    } else {
      setInputCardTitle("New Card"); // デフォルトタイトル
    }
  }, [cardId]);

  // タイトル変更時にlocalStorageに保存
  const handleSaveTitle = (title) => {
    localStorage.setItem(`title-${cardId}`, title);
  };

  const handleClick = () => {
    setIsClick(true);
  };

  const handleChange = (e) => {
    setInputCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveTitle(inputCardTitle);
    setIsClick(false);
  };

  const handleBlur = () => {
    handleSaveTitle(inputCardTitle);
    setIsClick(false);
  };

  return (
    <div onClick={handleClick} className="taskCardTitleInputArea">
      {isClick ? (
        <form onSubmit={handleSubmit}>
          <input
            className="taskCardTitleInput"
            autoFocus
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputCardTitle}
            maxLength="10"
          />
        </form>
      ) : (
        <h3>{inputCardTitle}</h3>
      )}
    </div>
  );
};
