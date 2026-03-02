import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const JobVacancies = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVac = await api.get("/job_vacancies");
        setVacancies(resVac.data.vacancies ?? []);
        const resApp = await api.get("/applications");
        const ids = (resApp.data.vacancies ?? []).map((app) => app.id);
        setAppliedIds(ids);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            Job Seeker Platform
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">{userName}</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Job Vacancies</h1>
          </div>
        </header>

        <div className="container mb-5">
          <div className="section-header mb-4">
            <h4 className="section-title text-muted font-weight-normal">
              List of Job Vacancies
            </h4>
          </div>

          <div className="section-body">
            {vacancies.length === 0 && (
              <div className="alert alert-info">
                No job vacancies available.
              </div>
            )}

            {vacancies.map((vacancy) => {
              const isApplied = appliedIds.includes(vacancy.id);
              return (
                <article
                  key={vacancy.id}
                  className={`spot ${isApplied ? "unavailable" : ""}`}
                >
                  <div className="row">
                    <div className="col-5">
                      <h5 className="text-primary">{vacancy.company}</h5>
                      <span className="text-muted">{vacancy.address}</span>
                      <p className="mt-2 mb-0 text-muted small">
                        {vacancy.description}
                      </p>
                    </div>
                    <div className="col-4">
                      <h5>Available Position (Capacity)</h5>
                      <span className="text-muted">
                        {vacancy.available_position
                          .map((pos) => `${pos.position} (${pos.capacity})`)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="col-3">
                      {isApplied ? (
                        <div className="bg-success text-white p-2">
                          Vacancies have been submitted
                        </div>
                      ) : (
                        <Link
                          to={`/job-vacancies/${vacancy.id}`}
                          className="btn btn-danger btn-lg btn-block"
                        >
                          Detail / Apply
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="text-center py-4 text-muted">
            Copyright &copy; 2023 - Web Tech ID
          </div>
        </div>
      </footer>
    </>
  );
};

export default JobVacancies;
