import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="main-container">
        <Sidebar />

        <div className="content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;