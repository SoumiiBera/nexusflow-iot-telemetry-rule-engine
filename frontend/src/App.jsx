import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Telemetry from "./pages/Telemetry";
import "./App.css";
import Rules from "./pages/Rules";
import Alerts from "./pages/Alerts";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Devices":
        return <Devices />;

      case "Telemetry":
        return <Telemetry />;

      case "Rules":
        return <Rules />;

      case "Alerts":
        return <Alerts />;  

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="app-layout">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {renderPage()}
      </div>
    </div>
  );
}

export default App;