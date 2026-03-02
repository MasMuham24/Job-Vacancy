import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const [validation, setValidation] = useState(null);
  const [applications, setApplications] = useState([]);
  const userName = localStorage.getItem("user_name");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVal = await api.get("/validations");
        setValidation(resVal.data.validation);

        if (resVal.data.validation?.status === "accepted") {
          const resApp = await api.get("/applications");
          setApplications(resApp.data.vacancies ?? []);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
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
            Job Seekers Platform
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
            <h1 className="display-4">Dashboard</h1>
          </div>
        </header>

        <div className="container">
          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Data Validation</h4>
            </div>
            <div className="row">
              {!validation ? (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header">
                      <h5 className="mb-0">Data Validation</h5>
                    </div>
                    <div className="card-body">
                      <Link
                        to="/request-validation"
                        className="btn btn-primary btn-block"
                      >
                        + Request validation
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header border-0">
                      <h5 className="mb-0">Data Validation</h5>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-striped mb-0">
                        <tbody>
                          <tr>
                            <th>Status</th>
                            <td>
                              <span
                                className={`badge badge-${
                                  validation.status === "accepted"
                                    ? "success"
                                    : validation.status === "rejected"
                                      ? "danger"
                                      : "info"
                                }`}
                              >
                                {validation.status}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>Job Category</th>
                            <td className="text-muted">
                              {validation.job_category?.job_category || "-"}
                            </td>
                          </tr>
                          <tr>
                            <th>Job Position</th>
                            <td className="text-muted">
                              {validation.job_position || "-"}
                            </td>
                          </tr>
                          <tr>
                            <th>Reason Accepted</th>
                            <td className="text-muted">
                              {validation.reason_accepted || "-"}
                            </td>
                          </tr>
                          <tr>
                            <th>Validator</th>
                            <td className="text-muted">
                              {validation.validator?.name || "-"}
                            </td>
                          </tr>
                          <tr>
                            <th>Validator Notes</th>
                            <td className="text-muted">
                              {validation.validator_notes || "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="section-title text-muted">
                    My Job Applications
                  </h4>
                </div>
                {validation?.status === "accepted" && (
                  <div className="col-md-4">
                    <Link
                      to="/job-vacancies"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      + Add Job Applications
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="section-body">
              <div className="row mb-4">
                {!validation || validation.status !== "accepted" ? (
                  <div className="col-md-12">
                    <div className="alert alert-warning">
                      Your validation must be approved by validator to applying
                      job.
                    </div>
                  </div>
                ) : (
                  applications.map((app, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="card card-default mb-3">
                        <div className="card-header border-0">
                          <h5 className="mb-0">{app.company}</h5>
                        </div>
                        <div className="card-body p-0">
                          <table className="table table-striped mb-0">
                            <tbody>
                              <tr>
                                <th>Address</th>
                                <td className="text-muted">{app.address}</td>
                              </tr>
                              <tr>
                                <th>Position</th>
                                <td className="text-muted">
                                  <ul>
                                    {app.position.map((pos, i) => (
                                      <li key={i}>
                                        {pos.position}{" "}
                                        <span
                                          className={`badge badge-${
                                            pos.apply_status === "accepted"
                                              ? "success"
                                              : pos.apply_status === "rejected"
                                                ? "danger"
                                                : "warning"
                                          }`}
                                        >
                                          {pos.apply_status}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <th>Notes</th>
                                <td className="text-muted">
                                  {app.position[0]?.notes || "-"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

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

export default Dashboard;
