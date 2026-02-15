import { useEffect, useState } from "react";
import API from "../api";
import "../styles/common.css";

export default function ExecutionList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("executions/").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h3 className="card-title">Execution Logs</h3>

        {logs.length === 0 ? (
          <div className="empty-state">No executions yet.</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="list-item">
              <div className="list-info">
                <div>{log.status}</div>
                <div className="sub-text">
                  {new Date(log.executed_at).toLocaleString()}
                </div>
              </div>

              <span
                className={`badge ${
                  log.status === "success"
                    ? "badge-success"
                    : "badge-danger"
                }`}
              >
                {log.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
