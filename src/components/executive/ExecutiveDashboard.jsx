import React, { useEffect, useState } from "react";

export default function ExecutiveDashboard() {
  const [contributions, setContributions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [month, setMonth] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch("http://localhost:8000/api/contributions/all/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setContributions(data);
        
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtering logic
  useEffect(() => {
    let data = contributions;
    if (month) data = data.filter(c => c.month === month);
    if (minAmount) data = data.filter(c => Number(c.amount) >= Number(minAmount));
    if (maxAmount) data = data.filter(c => Number(c.amount) <= Number(maxAmount));
    if (nameFilter) data = data.filter(c => c.user_email && c.user_email.toLowerCase().includes(nameFilter.toLowerCase()));
    setFiltered(data);
  }, [month, minAmount, maxAmount, nameFilter, contributions]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-yellow-800">Executive Dashboard Overview</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <p>Welcome, executive! Use the sidebar to manage members, contributions, loans, and more.</p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">All Member Contributions</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="border p-2 rounded"
            placeholder="Filter by month"
          />
          <input
            type="number"
            value={minAmount}
            onChange={e => setMinAmount(e.target.value)}
            className="border p-2 rounded"
            placeholder="Min amount"
          />
          <input
            type="number"
            value={maxAmount}
            onChange={e => setMaxAmount(e.target.value)}
            className="border p-2 rounded"
            placeholder="Max amount"
          />
          <input
            type="text"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            className="border p-2 rounded"
            placeholder="Filter by member email"
          />
        </div>
        {loading ? (
          <p>Loading contributions...</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Member Email</th>
                <th className="border px-4 py-2">Month</th>
                <th className="border px-4 py-2">Amount (KES)</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{c.user_email}</td>
                  <td className="border px-4 py-2">{c.month}</td>
                  <td className="border px-4 py-2">{Number(c.amount).toLocaleString()}</td>
                  <td className="border px-4 py-2">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}