import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const tableContainerRef = useRef(null);

  const [user, setUser] = useState({ name: "", email: "" });
  const [loginTime, setLoginTime] = useState("");

  const [category, setCategory] = useState("Bus");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoginTime(sessionStorage.getItem("loginTime") || "");

    const savedExpenses = sessionStorage.getItem("expenses");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, [navigate]);

  useEffect(() => {
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop =
        tableContainerRef.current.scrollHeight;
    }
  }, [expenses]);

  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addExpense = () => {
    const value = Number(amount);
    if (!value || value <= 0) return;

    setExpenses((prev) => [
      ...prev,
      { id: Date.now(), category, amount: value },
    ]);

    setAmount("");
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const categoryTotal = (cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className={`min-vh-100 ${darkMode ? "dark-app" : "bg-light"}`}>
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h4 className="fw-bold mb-0">📊 Monthly Expenses</h4>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="text-end header-user">
              <small className={`text-muted ${darkMode ? "dark-muted" : ""}`}>
                👤 {user.name}
              </small><br />
              <small className={`text-muted ${darkMode ? "dark-muted" : ""}`}>
                📧 {user.email}
              </small><br />
              <small className={`text-muted ${darkMode ? "dark-muted" : ""}`}>
                ⏰ {loginTime}
              </small>
            </div>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="row g-3">

          {/* Add Expense */}
          <div className="col-md-4">
            <div className={`card shadow-sm ${darkMode ? "dark-card" : ""}`}>
              <div className="card-body">
                <h6 className="fw-semibold mb-3">➕ Add Expense</h6>

                <select
                  className={`form-select mb-3 ${darkMode ? "dark-select" : ""}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {["Bus", "Train", "Movie", "Food", "Others"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <input
                  type="number"
                  className={`form-control mb-3 ${darkMode ? "dark-input" : ""}`}
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addExpense()}
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={addExpense}
                  disabled={!amount || Number(amount) <= 0}
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div className="col-md-8">
            <div className={`card shadow-sm ${darkMode ? "dark-card" : ""}`}>
              <div
                className="card-body"
                ref={tableContainerRef}
                style={{ maxHeight: 300, overflowY: "auto" }}
              >
                <h6 className="fw-semibold mb-3">🧾 Expenses</h6>

                <table className={`table ${darkMode ? "dark-table" : "table-bordered"}`}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>₹</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e) => (
                      <tr key={e.id}>
                        <td>{e.category}</td>
                        <td>{e.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!expenses.length && (
                  <p className={`text-center mt-3 text-muted ${darkMode ? "dark-muted" : ""}`}>
                    No expenses yet
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className={`card shadow-sm mt-3 ${darkMode ? "dark-card" : ""}`}>
              <div className="card-body">
                <h6 className="fw-semibold mb-3">📌 Summary</h6>

                <ul className="list-group mb-3">
                  {["Bus", "Train", "Movie", "Food", "Others"].map((cat) => (
                    <li
                      key={cat}
                      className={`list-group-item d-flex justify-content-between ${darkMode ? "dark-list" : ""}`}
                    >
                      {cat}
                      <span>₹{categoryTotal(cat)}</span>
                    </li>
                  ))}
                </ul>

                <div className="alert alert-success text-center fw-bold">
                  Total: ₹{total}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
