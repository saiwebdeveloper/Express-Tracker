import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Bus");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!amount) return;

    setExpenses([
      ...expenses,
      { category, amount: Number(amount) }
    ]);

    setAmount("");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotal = (cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📊 Monthly Expenses Tracker</h3>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="row">
        {/* Add Expense */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Add Expense</h5>

              <select
                className="form-select mb-3"
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
                className="form-control mb-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="btn btn-primary w-100" onClick={addExpense}>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Expenses List</h5>

              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Category</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e, i) => (
                    <tr key={i}>
                      <td>{e.category}</td>
                      <td>{e.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {expenses.length === 0 && (
                <p className="text-muted text-center">
                  No expenses added yet
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Monthly Summary</h5>

              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  Bus <span>₹{categoryTotal("Bus")}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Train <span>₹{categoryTotal("Train")}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Movie <span>₹{categoryTotal("Movie")}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Food <span>₹{categoryTotal("Food")}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Others <span>₹{categoryTotal("Others")}</span>
                </li>
              </ul>

              <div className="alert alert-success text-center fw-bold">
                Total Monthly Expense: ₹{total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
