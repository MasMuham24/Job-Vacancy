import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const RequestValidation = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    job_category_id: "",
    job_position: "",
    work_experience: "",
    reason_accepted: "",
    has_experience: "no",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/job_categories").then((res) => {
      setCategories(res.data.job_categories ?? []);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/validations", {
        job_category_id: form.job_category_id,
        job_position: form.job_position,
        work_experience:
          form.has_experience === "yes" ? form.work_experience : "",
        reason_accepted: form.reason_accepted,
      });
      alert("Request data validation successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
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
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Request Data Validation</h1>
          </div>
        </header>

        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Job Category</label>
                  <select
                    className="form-control-sm"
                    name="job_category_id"
                    value={form.job_category_id}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.job_category}
                      </option>
                    ))}
                  </select>
                </div>

                {form.job_category_id && (
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    name="job_position"
                    value={form.job_position}
                    onChange={handleChange}
                    placeholder="Job position separate with , (comma)"
                  />
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Work Experiences ?</label>
                  <select
                    className="form-control-sm"
                    name="has_experience"
                    value={form.has_experience}
                    onChange={handleChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes, I have</option>
                  </select>
                </div>
                {form.has_experience === "yes" && (
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    name="work_experience"
                    value={form.work_experience}
                    onChange={handleChange}
                    placeholder="Describe your work experiences"
                  />
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Reason Accepted</label>
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="6"
                  name="reason_accepted"
                  value={form.reason_accepted}
                  onChange={handleChange}
                  placeholder="Explain why you should be accepted"
                />
              </div>
            </div>
          </div>

          {form.reason_accepted && (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          )}
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

export default RequestValidation;
