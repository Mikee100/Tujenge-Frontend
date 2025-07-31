import React, { useState } from "react";

const dummyContributions = [
  { date: "2025-07-01", amount: 2000 },
  { date: "2025-06-01", amount: 1500 },
  { date: "2025-05-01", amount: 1800 },
];

export default function MonthlyContributionPage() {
  const [amount, setAmount] = useState("");
  const [contributions, setContributions] = useState(dummyContributions);
  const target = 2000;
  const thisMonth = "July 2025";
  const contributed = contributions[0]?.amount || 0;
  const percent = Math.min(100, Math.round((contributed / target) * 100));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    setContributions([{ date: new Date().toISOString().slice(0, 10), amount: Number(amount) }, ...contributions]);
    setAmount("");
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-6 ">Monthly Contribution</h1>
      {/* Progress Card */}
      <div className="bg-white rounded shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-gray-500 text-sm mb-1">Current Target ({thisMonth})</div>
          <div className="text-3xl font-bold text-green-800 mb-2">KES {target.toLocaleString()}</div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: percent + "%" }}></div>
          </div>
          <div className="text-sm text-gray-600">Progress: {percent}% ({contributed.toLocaleString()} / {target.toLocaleString()})</div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 md:mt-0 flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount (KES)"
            className="border p-2 rounded w-40"
            required
          />
          <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700" type="submit">
            Contribute
          </button>
        </form>
      </div>
      {/* Past Contributions Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Past Contributions</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{c.date}</td>
                <td className="border px-4 py-2">{c.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 