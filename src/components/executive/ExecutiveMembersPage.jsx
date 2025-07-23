import React, { useEffect, useState } from "react";

export default function ExecutiveMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch("http://localhost:8000/api/members/all/", {
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
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-yellow-800">Manage Group Members</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <p>Here, executives can view, add, remove, and update group members and their roles.</p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">All Members</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Email</th>
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
      </div>
    </div>
  );
}