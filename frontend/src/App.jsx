import { lazy, Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Devices = lazy(() => import("./pages/Devices"));
const Telemetry = lazy(() => import("./pages/Telemetry"));
const Rules = lazy(() => import("./pages/Rules"));
const Alerts = lazy(() => import("./pages/Alerts"));

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

        <Suspense fallback={<div className="page-loading">Loading page...</div>}>
          {renderPage()}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
