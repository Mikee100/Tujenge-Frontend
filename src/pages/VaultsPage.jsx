import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Vaults() {
  const [summary, setSummary] = useState({});
  const [growthData, setGrowthData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const accesstoken = localStorage.getItem("access"); // Replace with your actual token key

    if (!accesstoken) {
      console.error('No access token found');
      return;
    }

    const headers = {
      Authorization: `Bearer ${accesstoken}`
    };

    axios.get('/api/summary/', { headers })
      .then(res => setSummary(res.data))
      .catch(err => console.error('Summary fetch error:', err));

    axios.get('/api/growth/', { headers })
      .then(res => {
        setGrowthData({
          labels: res.data.dates,
          datasets: [{
            label: 'Vault Growth',
            data: res.data.amounts,
            fill: false,
            borderColor: '#047056',
            tension: 0.3
          }]
        });
      })
      .catch(err => console.error('Growth fetch error:', err));

    axios.get('/api/pie/', { headers })
      .then(res => {
        setPieData({
          labels: ['Contributions', 'Loans Disbursed', 'Loan Repayments'],
          datasets: [{
            data: [res.data.contributions, res.data.loans, res.data.repayments],
            backgroundColor: ['#047056', '#EDC14A', '#A3A3A3']
          }]
        });
      })
      .catch(err => console.error('Pie fetch error:', err));

    axios.get('/api/activity/', { headers })
      .then(res => setActivities(res.data))
      .catch(err => console.error('Activity fetch error:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Vault Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total Vault Balance" value={summary.total_balance} />
        <Card title="Total Contributions" value={summary.total_contributions} />
        <Card title="Loans Disbursed" value={summary.total_loans_disbursed} />
        <Card title="Loan Repayment" value={summary.total_loan_repayment} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Vault Growth</h2>
          {growthData ? <Line data={growthData} /> : <p className="text-gray-500">Loading chart...</p>}
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Fund Distribution</h2>
          {pieData ? <Pie data={pieData} /> : <p className="text-gray-500">Loading chart...</p>}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Vault Activity</h2>
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-3 border">Date</th>
              <th className="py-2 px-3 border">User</th>
              <th className="py-2 px-3 border">Action</th>
              <th className="py-2 px-3 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-3 border">{item.date}</td>
                  <td className="py-2 px-3 border">{item.user}</td>
                  <td className="py-2 px-3 border">{item.action}</td>
                  <td className="py-2 px-3 border">Ksh {item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No recent activity</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-md text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-[#047056]">{value ? `Ksh ${value}` : 'Ksh 0'}</p>
    </div>
  );
}
