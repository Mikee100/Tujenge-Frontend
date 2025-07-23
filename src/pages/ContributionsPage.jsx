import React, { useState, useEffect } from "react";

export default function ContributionsPage() {
  const [amount, setAmount] = useState("");
  const [contributions, setContributions] = useState([]);
  const target = 2000;
  const thisMonth = "July 2025";
  const contributed = contributions[0]?.amount || 0;
  const percent = Math.min(100, Math.round((contributed / target) * 100));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chamaId, setChamaId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  function parseJwt(token) {
    if (!token) return {};
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return {};
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch("http://localhost:8000/api/user/profile/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setChamaId(data.chama))
      .catch(() => setError("Failed to load user profile."));
  }, []);

  // Fetch contributions on mount
  useEffect(() => {
    if (!chamaId) return;
    setLoading(true);
    const token = localStorage.getItem("access");
    fetch(`http://localhost:8000/api/chama/${chamaId}/my-contributions/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setContributions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load contributions.");
        setLoading(false);
      });
  }, [chamaId]);



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedMonth) return;

    const token = localStorage.getItem("access");
    const payload = {
      amount: Number(amount),
      month: selectedMonth,
      chama: chamaId,

    };

    console.log("Submitting contribution payload:", payload);

    try {
      const response = await fetch(`http://localhost:8000/api/chama/${chamaId}/contributions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newContribution = await response.json();
        setContributions([newContribution, ...contributions]);
        setAmount("");
      } else {
        const err = await response.json().catch(() => ({}));
        alert(
          err.detail ||
          Object.values(err).flat().join(" ") ||
          "Failed to contribute."
        );
      }
    } catch (err) {
      alert("Network error.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monthly Contribution</h1>
      {/* Progress Card */}
      <div className="bg-white rounded shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-gray-500 text-sm mb-1">Select Month</div>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <div className="text-gray-500 text-sm mb-1">Current Target ({selectedMonth})</div>
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
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{c.month}</td>
                <td className="border px-4 py-2">{c.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}