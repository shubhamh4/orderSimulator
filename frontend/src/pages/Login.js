import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("auth/login/", form);

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    navigate("/dashboard");
  };

  return (
    <div className="page-container-sm">
      <div className="card">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
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
            <button type="submit" className="btn-primary">Login</button>
          </center>
        </form>
      </div>
    </div>
  );
}
