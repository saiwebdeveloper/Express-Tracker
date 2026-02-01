import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // User info
  const [user, setUser] = useState({ name: "", email: "" });
  const [loginTime, setLoginTime] = useState("");

  // Expenses & theme
  const [category, setCategory] = useState("Bus");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("darkMode") === "true"
  );

  const tableContainerRef = useRef(null);

  // Load user info and expenses
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedTime = sessionStorage.getItem("loginTime");
    if (!storedUser) {
      navigate("/"); // if not logged in, redirect to login
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoginTime(storedTime || "");

    const savedExpenses = sessionStorage.getItem("expenses");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, [navigate]);

  // Save expenses & auto-scroll
  useEffect(() => {
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop =
        tableContainerRef.current.scrollHeight;
    }
  }, [expenses]);

  // Persist theme
  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add new expense
  const addExpense = () => {
    if (!amount || Number(amount) <= 0) return;
    setExpenses([...expenses, { category, amount: Number(amount) }]);
    setAmount("");
  };

  // Delete expense
  const deleteExpense = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  // Logout
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotal = (cat) =>
    expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className={`min-vh-100 ${darkMode ? "dark-app" : "bg-light"}`}>
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">📊 Monthly Expenses</h4>

          <div className="d-flex align-items-center gap-3">
            {/* User info */}
            <div className="d-flex flex-column text-end me-3">
              <small className="text-muted">👤 {user.name}</small>
              <small className="text-muted">📧 {user.email}</small>
              <small className="text-muted">⏰ Logged in: {loginTime}</small>
            </div>

            {/* Theme toggle */}
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Logout */}
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="row g-3">

          {/* Add Expense */}
          <div className="col-12 col-md-4">
            <div className={`card shadow-sm ${darkMode ? "dark-card" : ""}`}>
              <div className="card-body">
                <h6 className="fw-semibold mb-3">➕ Add Expense</h6>

                <select
                  className={`form-select mb-3 ${darkMode ? "dark-select" : ""}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Movie</option>
                  <option>Food</option>
                  <option>Others</option>
                </select>

                <input
                  type="number"
                  className={`form-control mb-3 ${darkMode ? "dark-input" : ""}`}
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <button className="btn btn-primary w-100" onClick={addExpense} disabled={!amount}>
                  Add Expense
                </button>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div className="col-12 col-md-8">
            <div className={`card shadow-sm ${darkMode ? "dark-card" : ""}`}>
              <div
                className="card-body"
                style={{ maxHeight: "300px", overflowY: "auto" }}
                ref={tableContainerRef}
              >
                <h6 className="fw-semibold mb-3">🧾 Expenses</h6>

                <table className={`table mb-0 ${darkMode ? "dark-table" : "table-bordered"}`}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>₹</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e, i) => (
                      <tr key={i}>
                        <td>{e.category}</td>
                        <td>{e.amount}</td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteExpense(i)}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {expenses.length === 0 && (
                  <p className="text-center mt-3 text-muted">No expenses yet</p>
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

                <div className="alert alert-success text-center fw-bold mb-0">
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
