import React from "react";

export const Header = () => {
  const resetLocalStorage = () => {
      localStorage.clear(); // localStorageをすべてクリア
      window.location.reload(); // ページをリロードして状態を反映させる
  };
  
  return (
    <div>
      <header>
        <div class="l-header">
          <h1>TO DO LIST</h1>
          <button onClick={resetLocalStorage} className="reset-button">
            全てリセット<i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </header>
    </div>
  );
};