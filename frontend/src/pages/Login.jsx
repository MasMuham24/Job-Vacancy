import React, { useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [idCardNumber, setIdCardNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        id_card_number: idCardNumber,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_name", response.data.name);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert("ID Card Number or Password incorrect");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">Job Seekers Platform</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header className="jumbotron">
          <div className="container text-center">
            <h1 className="display-4">Job Seekers Platform</h1>
          </div>
        </header>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card card-default" onSubmit={handleLogin}>
                <div className="card-header"><h4 className="mb-0">Login</h4></div>
                <div className="card-body">
                  <div className="form-group row align-items-center">
                    <div className="col-4 text-right">ID Card Number</div>
                    <div className="col-8">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={idCardNumber} 
                        onChange={(e) => setIdCardNumber(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <div className="col-4 text-right">Password</div>
                    <div className="col-8">
                      <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center mt-4">
                    <div className="col-4"></div>
                    <div className="col-8">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container text-center py-4 text-muted">
          Copyright &copy; 2023 - Web Tech ID
        </div>
      </footer>
    </>
  );
};

export default Login;