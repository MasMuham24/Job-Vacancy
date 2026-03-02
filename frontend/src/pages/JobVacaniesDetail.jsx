import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const JobVacancyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await api.get(`/job_vacancies/${id}`);
        setVacancy(res.data.vacancy);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchVacancy();
  }, [id, navigate]);

  const handleCheckbox = (position) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position],
    );
  };

  const handleApply = async () => {
    if (selectedPositions.length === 0) {
      setError("Please select at least one position.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/applications", {
        vacancy_id: parseInt(id),
        positions: selectedPositions,
        notes: notes,
      });
      alert("Apply job successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  if (!vacancy) return <div className="container mt-5">Loading...</div>;

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
          <div className="container text-center">
            <h1 className="display-4">{vacancy.company}</h1>
            <span className="text-muted">{vacancy.address}</span>
          </div>
        </header>

        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-group">
                <h3>Description</h3>
                <p>{vacancy.description}</p>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-group">
                <h3>Select position</h3>
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th width="1">#</th>
                      <th>Position</th>
                      <th>Capacity</th>
                      <th>Application / Max</th>
                      <th
                        rowSpan={vacancy.available_position.length + 1}
                        style={{
                          verticalAlign: "middle",
                          whiteSpace: "nowrap",
                        }}
                        width="1"
                      >
                        <button
                          className="btn btn-primary btn-lg"
                          onClick={handleApply}
                          disabled={loading}
                        >
                          {loading ? "Applying..." : "Apply for this job"}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vacancy.available_position.map((pos, i) => {
                      const isFull = pos.apply_count >= pos.apply_capacity;
                      const isChecked = selectedPositions.includes(
                        pos.position,
                      );
                      return (
                        <tr key={i} className={isFull ? "table-warning" : ""}>
                          <td>
                            <input
                              type="checkbox"
                              disabled={isFull}
                              checked={isChecked}
                              onChange={() =>
                                !isFull && handleCheckbox(pos.position)
                              }
                            />
                          </td>
                          <td>{pos.position}</td>
                          <td>{pos.capacity}</td>
                          <td>
                            {pos.apply_count}/{pos.apply_capacity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Notes for Company</label>
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="6"
                  placeholder="Explain why you should be accepted"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
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

export default JobVacancyDetail;
