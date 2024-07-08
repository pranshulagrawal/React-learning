import "./App.css";
import Hello from "./components/Hello";
import Passing_Array_props from "./components/Passing_Array_props";

function App() {
  // const seatNumbers = [1, 4, 7];
  const person = {
    name: "Pranshul",
    message: "Hi There!",
    emoji: "👋",
    seatNumbers: [1, 4, 7],
  };
  return (
    <div className="App">
      {/* <Hello name="Pranshul" message="Hi There!" emoji="👋" />
      <Hello name="Anirudh" message="Hi There!" emoji="👋" />
      <Hello name="Ankit" message="Hi There!" emoji="👋" />
      <Hello name="Sunil" message="Hi There!" emoji="👋" />
      <Hello name="Rocky" message="Hi There!" emoji="👋" /> */}
      <Passing_Array_props person={person} />
    </div>
  );
}

export default App;
