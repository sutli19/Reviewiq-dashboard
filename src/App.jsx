import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Topbar from "./components/layout/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ReviewExplorer from "./pages/ReviewExplorer.jsx";
import AIInsights from "./pages/AIInsights.jsx.jsx";
import ActionCenter from "./pages/ActionCenter.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex">
      <div className="aurora-bg">
        <div className="aurora-blob one" />
        <div className="aurora-blob two" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reviews" element={<ReviewExplorer />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/actions" element={<ActionCenter />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}