"use client";

import { useState } from "react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Grocery Store", amount: -54.32, date: "2026-05-03" },
    { id: 2, name: "Salary", amount: 1500.0, date: "2026-05-01" },
    { id: 3, name: "Netflix", amount: -12.99, date: "2026-04-28" },
  ]);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTx = {
      id: Date.now(),
      name: form.name,
      amount: parseFloat(form.amount),
      date: form.date,
    };

    setTransactions([newTx, ...transactions]);
    setForm({ name: "", amount: "", date: "" });
    setIsOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Balance */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold text-gray-700">
            Account Balance
          </h1>
          <p className="text-3xl font-bold mt-2 text-green-600">
            £{balance.toFixed(2)}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <ul className="space-y-3">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{tx.name}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <p
                  className={`font-semibold ${
                    tx.amount < 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}£
                  {Math.abs(tx.amount).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Add Transaction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="number"
                step="0.01"
                placeholder="Amount (use negative for expenses)"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gray-200 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}