import React, { useState, useEffect } from "react";

export const TaskCardTitle = ({ cardId }) => {
  const [isClick, setIsClick] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // 初期タイトルと日付をlocalStorageから読み込む
  useEffect(() => {
    const savedTitle = localStorage.getItem(`title-${cardId}`);
    const savedDueDate = localStorage.getItem(`dueDate-${cardId}`);
    if (savedTitle) {
      setInputCardTitle(savedTitle);
    } else {
      setInputCardTitle("New Card"); // デフォルトタイトル
    }
    if (savedDueDate) {
      setDueDate(savedDueDate);
    }
  }, [cardId]);

  // タイトルと日付変更時にlocalStorageに保存
  const handleSave = () => {
    localStorage.setItem(`title-${cardId}`, inputCardTitle);
    localStorage.setItem(`dueDate-${cardId}`, dueDate);
  };

  const handleTitleClick = () => {
    setIsClick(true);
  };

  const handleTitleChange = (e) => {
    setInputCardTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    handleSave(); // 日付変更時に保存
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
    setIsClick(false);
  };

  const handleBlur = () => {
    handleSave();
    setIsClick(false);
  };

  // 日付リセット
  const handleResetDate = () => {
    setDueDate(""); // 日付をリセット
    localStorage.removeItem(`dueDate-${cardId}`); // localStorageからも削除
  };

  // 現在の日時と選択された日付を比較
  const isOverdue = dueDate && new Date(dueDate) < new Date();

  // 日付選択の表示/非表示を切り替え
  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  return (
    <div className="taskCardTitleInputArea">
      {isClick ? (
        <form onSubmit={handleSubmit}>
          <input
            className="taskCardTitleInput"
            autoFocus
            type="text"
            onChange={handleTitleChange}
            onBlur={handleBlur}
            value={inputCardTitle}
            maxLength="10"
          />
        </form>
      ) : (
        <div onClick={handleTitleClick}>
          <h3 style={{ color: isOverdue ? "red" : "black" }}>
            {inputCardTitle}
          </h3>
        </div>
      )}

      {dueDate && (
        <p className={isOverdue ? "dueDateOver" : "dueDate"}>
          期限: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {/* 日付選択ボタン */}
      <button
        type="button"
        className="dateButton"
        onClick={toggleDatePicker}
      >
        {isDatePickerVisible ?          
          <>
            変更<i className="fas fa-calendar-check"></i>
          </> : 
          <>
            日付設定<i class="fas fa-calendar-alt"></i>
          </>
        }
      </button>

      {/* 日付選択フィールド */}
      {isDatePickerVisible && (
        <input
          className="dueDateInput"
          type="date"
          value={dueDate}
          onChange={handleDateChange}
        />
      )}

      {/* 日付リセットボタン */}
      {dueDate && (
        <button
          type="button"
          onClick={handleResetDate}
          className="resetButton"
        >
          リセット<i class="fas fa-calendar-times"></i>
        </button>
      )}
    </div>
  );
};
