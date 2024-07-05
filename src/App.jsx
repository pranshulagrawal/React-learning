import "./App.css";
import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
      <Hello name="Pranshul" message="Hi There!" emoji="👋" />
      <Hello name="Anirudh" message="Hi There!" emoji="👋" />
      <Hello name="Ankit" message="Hi There!" emoji="👋" />
      <Hello name="Sunil" message="Hi There!" emoji="👋" />
      <Hello name="Rocky" message="Hi There!" emoji="👋" />
    </div>
  );
}

export default App;
