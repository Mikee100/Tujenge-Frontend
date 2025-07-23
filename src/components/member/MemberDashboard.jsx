import React, { useEffect, useState } from "react";

export default function MemberDashboard() {
  const [chamaId, setChamaId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (!chamaId) return;
    const token = localStorage.getItem("access");
    fetch(`http://localhost:8000/api/chama/members/${chamaId}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [chamaId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-900">Member Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Chama Members</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading members...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{m.email}</td>
                <td className="border px-4 py-2 capitalize">{m.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* TODO: Make chama_id dynamic and add authentication headers if needed */}
    </div>
  );
} 