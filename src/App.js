import { Header } from "./components/header/Header";
import { TaskCards } from "./components/task/TaskCards";

function App() {
  const resetLocalStorage = () => {
    localStorage.clear(); // localStorageをすべてクリア
    window.location.reload(); // ページをリロードして状態を反映させる
  };

  return (
    <div className="app">
      <Header />
      <button onClick={resetLocalStorage} className="reset-button">
        全てリセット<i class="fas fa-sync-alt"></i>
      </button>
      <TaskCards />
    </div>
  );
}

export default App;
