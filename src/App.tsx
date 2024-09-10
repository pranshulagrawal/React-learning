import React, { useEffect } from "react";
import "./App.css";
import { RootStore } from "./stores";
import AppRoutes from "./routes";

const rootStore = new RootStore();
function App() {
  useEffect(() => {
    rootStore.nodeStore.loadNodes(); // Load nodes at app load time
    rootStore.nodeDetailsStore.loadNodes(); // Load node details at app load time
  }, []);
  return <AppRoutes />;
}

export default App;
