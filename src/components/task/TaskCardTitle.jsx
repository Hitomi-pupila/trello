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
    setInputCardTitle(savedTitle || "New Card"); // デフォルトタイトル
    setDueDate(savedDueDate || ""); // 保存されていない場合は空文字列
  }, [cardId]);

  // タイトル変更時にlocalStorageに保存
  useEffect(() => {
    localStorage.setItem(`title-${cardId}`, inputCardTitle);
  }, [inputCardTitle, cardId]);

  // 日付変更時にlocalStorageに保存
  useEffect(() => {
    if (dueDate) {
      localStorage.setItem(`dueDate-${cardId}`, dueDate);
    }
  }, [dueDate, cardId]);

  const handleTitleClick = () => setIsClick(true);

  const handleTitleChange = (e) => setInputCardTitle(e.target.value);

  const handleDateChange = (e) => setDueDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClick(false);
  };

  const handleBlur = () => setIsClick(false);

  const handleResetDate = () => {
    setDueDate("");
    localStorage.removeItem(`dueDate-${cardId}`);
  };

  const toggleDatePicker = () => setIsDatePickerVisible(!isDatePickerVisible);

  // 今日の日付を取得し、時刻情報をクリア
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時刻情報をクリアして比較
    return today;
  };

  // 現在の日時と選択された日付を比較（期限切れは翌日以降のみ）
  const isOverdue = dueDate && new Date(dueDate) < getToday();

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

      <div className="dateButtonFlex">
        <button
          type="button"
          className="dateButton"
          onClick={toggleDatePicker}
          aria-label={isDatePickerVisible ? "変更" : "日付設定"}
        >
          {isDatePickerVisible ? (
            <i className="fas fa-calendar-check"></i>
          ) : (
            <i className="fas fa-calendar-alt"></i>
          )}
        </button>

        {dueDate && (
          <button
            type="button"
            onClick={handleResetDate}
            className="resetButton"
            aria-label="リセット"
          >
            <i className="fas fa-calendar-times"></i>
          </button>
        )}
      </div>

      {isDatePickerVisible && (
        <input
          className="dueDateInput"
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          title="日付選択"
        />
      )}
    </div>
  );
};
