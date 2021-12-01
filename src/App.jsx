import "./App.css";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <main className="main">
      <Timer start="60000" step="1" />
    </main>
  );
}

export default App;
