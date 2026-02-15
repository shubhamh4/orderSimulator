import { useState } from "react";
import API from "../api";
import "../styles/common.css";

export default function OrderForm() {
  const [form, setForm] = useState({
    product: "Coffee",
    quantity: 1,
    start_time: "",
    frequency: "daily",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("scheduled-orders/", form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-container-sm">
      <div className="card">
        <h3 className="card-title">Create Scheduled Order</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              type="datetime-local"
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <select
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value })
              }
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Create Order
          </button>
        </form>

        {success && (
          <div className="success-message">
            Order Created Successfully
          </div>
        )}
      </div>
    </div>
  );
}
