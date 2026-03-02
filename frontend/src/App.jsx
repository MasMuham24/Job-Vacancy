import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/custom.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import RequestValidation from "./pages/RequestValidations";
import JobVacancies from "./pages/JobVacanies";
import JobVacancyDetail from "./pages/JobVacaniesDetail";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-validation" element={<RequestValidation />} />
        <Route path="/job-vacancies" element={<JobVacancies />} />
        <Route path="/job-vacancies/:id" element={<JobVacancyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;