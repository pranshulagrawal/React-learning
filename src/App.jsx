import "./App.css";
import Hello from "./components/Hello";

function App() {
  const name = "Pranshul";
  return (
    <div className="App">
      Hello {name} <Hello />
    </div>
  );
}

export default App;
