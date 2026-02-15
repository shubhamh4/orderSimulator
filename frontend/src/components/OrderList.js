import { useEffect, useState } from "react";
import API from "../api";
import "../styles/common.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("scheduled-orders/").then((res) => {
      setOrders(res.data);
    });
  };

  // ✅ Toggle Active/Inactive
  const toggleStatus = async (order) => {
    try {
      const res = await API.patch(`scheduled-orders/${order.id}/`, {
        is_active: !order.is_active,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? res.data : o
        )
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  // ✅ Delete Order
  const deleteOrder = async (id) => {
    try {
      await API.delete(`scheduled-orders/${id}/`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h3 className="card-title">Your Scheduled Orders</h3>

        {orders.length === 0 ? (
          <div className="empty-state">
            No scheduled orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="list-item">
              <div className="list-info">
                <div>{order.product}</div>
                <div className="sub-text">
                  {order.frequency}
                </div>
              </div>

              <div className="action-group">
                <span
                  className={`badge ${
                    order.is_active
                      ? "badge-success"
                      : "badge-danger"
                  }`}
                >
                  {order.is_active ? "Active" : "Inactive"}
                </span>

                <button
                  className="btn btn-small"
                  onClick={() => toggleStatus(order)}
                >
                  Toggle
                </button>

                <button
                  className="btn btn-danger btn-small"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
