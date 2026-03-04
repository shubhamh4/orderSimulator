import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("auth/register/", form);
    navigate("/");
  };

  return (
    <div className="page-container-sm">
      <div className="card">
        <h2 className="card-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <center>
            <button type="submit" className="btn-primary">Register</button>
          </center>
          <p className="auth-redirect">
            have an account? <Link to="/">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
