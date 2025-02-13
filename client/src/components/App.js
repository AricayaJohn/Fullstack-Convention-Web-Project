import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConventionProvider } from "../context/ConventionContext";
import HomePage from "./HomePage";
import ConventionAreaForm from "./ConventionAreaForm";
import ConventionsPage from "./ConventionsPage";
import HostsPage from "./HostsPage";
import HostInAreaPage from "./HostInAreaPage";


function App() {
  return (
    <ConventionProvider>
      <Router>
        <main>
          <h1> Convention Event Management</h1>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/add-convention-area" element={<ConventionAreaForm/>} />
            <Route path="/conventions/:areaId" element={<ConventionsPage/>} />
            <Route path="/hosts/:conventionId" element={<HostsPage/>} />
            <Route path="/host_in_area/:areaId" element={<HostInAreaPage />} />
          </Routes>
        </main>
      </Router>
    </ConventionProvider>
  );
}

export default App;
