import React, { useState, useEffect } from "react";

export default function ContributionsPage() {
  const [amount, setAmount] = useState("");
  const [contributions, setContributions] = useState([]);
  const [monthlyProgress, setMonthlyProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chamaId, setChamaId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const target = 2000;

  // Get current month's progress
  const currentMonthProgress = monthlyProgress.find(p => p.month === selectedMonth) || {
    contributed: 0,
    progress_percent: 0,
    is_complete: false
  };

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

  // Fetch contributions and progress
  useEffect(() => {
    if (!chamaId) return;
    setLoading(true);
    const token = localStorage.getItem("access");
    
    // Fetch both contributions and progress
    Promise.all([
      fetch(`http://localhost:8000/api/chama/${chamaId}/my-contributions/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      fetch(`http://localhost:8000/api/chama/${chamaId}/progress/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
    ])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(([contributionsData, progressData]) => {
        setContributions(contributionsData);
        setMonthlyProgress(progressData.monthly_progress);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data.");
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
        
        // Refresh progress data
        const progressResponse = await fetch(`http://localhost:8000/api/chama/${chamaId}/progress/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setMonthlyProgress(progressData.monthly_progress);
        }
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
        <div className="flex-1">
          <div className="text-gray-500 text-sm mb-1">Select Month</div>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="border p-2 rounded mb-4"
            required
          />
          
          <div className="text-gray-500 text-sm mb-1">
            Target for {selectedMonth}: KES {target.toLocaleString()}
          </div>
          
          <div className="text-3xl font-bold text-green-800 mb-2">
            KES {currentMonthProgress.contributed.toLocaleString()}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full transition-all duration-300 ${
                currentMonthProgress.is_complete ? 'bg-green-600' : 'bg-green-500'
              }`}
              style={{ width: `${currentMonthProgress.progress_percent}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600">
            Progress: {currentMonthProgress.progress_percent}% 
            ({currentMonthProgress.contributed.toLocaleString()} / {target.toLocaleString()})
          </div>
          
          {currentMonthProgress.is_complete && (
            <div className="text-sm text-green-600 font-semibold mt-1">
              ✓ Target reached for {selectedMonth}!
            </div>
          )}
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

      {/* Monthly Progress Overview */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyProgress.map((progress, index) => (
            <div key={index} className="border rounded p-4">
              <div className="font-semibold text-lg">{progress.month}</div>
              <div className="text-sm text-gray-600">
                {progress.contributed.toLocaleString()} / {progress.target.toLocaleString()} KES
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    progress.is_complete ? 'bg-green-600' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress.progress_percent}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {progress.progress_percent}% {progress.is_complete && '✓ Complete'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Contributions Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">All Contributions</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Amount (KES)</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{c.month}</td>
                <td className="border px-4 py-2">{Number(c.amount).toLocaleString()}</td>
                <td className="border px-4 py-2">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}