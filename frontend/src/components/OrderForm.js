import { useState, useEffect } from "react";
import API from "../api";
import "../styles/common.css";

export default function OrderForm() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    product: "",
    quantity: 1,
    start_time: "",
    frequency: "daily",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("products/");
      setProducts(res.data);

      // Set first product as default
      if (res.data.length > 0) {
        setForm((prev) => ({
          ...prev,
          product: res.data[0].id,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

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
          {/* Product Dropdown */}
          <div className="form-group">
            <select
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
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

          {/* Start Time */}
          <div className="form-group">
            <input
              type="datetime-local"
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          {/* Frequency */}
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
