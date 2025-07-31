import React, { useState, useEffect } from 'react';

const LoansPage = () => {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chamaId, setChamaId] = useState(null);

  // Get user's chama
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

  const fetchLoans = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await fetch('http://localhost:8000/api/loans/', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLoans(data);
      }
    } catch (error) {
      setError('Failed to fetch loans');
    }
  };

  useEffect(() => {
    if (chamaId) {
      fetchLoans();
    }
  }, [chamaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !purpose || !chamaId) return;
  
    setLoading(true);
    const token = localStorage.getItem("access");
    
    try {
      const response = await fetch('http://localhost:8000/api/loans/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          purpose,
          chama: chamaId,  // Make sure this is included
        }),
      });
  
      if (response.ok) {
        const newLoan = await response.json();
        setLoans([newLoan, ...loans]);
        setAmount('');
        setPurpose('');
        setError('');
      } else {
        const err = await response.json().catch(() => ({}));
        setError(err.detail || 'Failed to submit loan request');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'paid': return 'text-blue-600 bg-blue-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Loan Management</h1>
      
      {/* Loan Request Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Request a Loan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (KES)
              </label>
              <input
                type="number"
                placeholder="Enter loan amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <input
                type="text"
                placeholder="What is the loan for?"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Loan Request'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Loan Requests</h2>
        {loans.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No loan requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      KES {Number(loan.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {loan.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(loan.requested_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Loan Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Loan Amount (Ksh)</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded text-sm"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Repayment Period</label>
                <select
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                >
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Purpose</label>
                <textarea
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Collateral (Optional)</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded text-sm"
                  value={collateral}
                  onChange={(e) => setCollateral(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={contributionConfirmed}
                  onChange={(e) => setContributionConfirmed(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">
                  I confirm I have made my monthly contributions
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#047056] text-white rounded hover:bg-[#035d47] text-sm"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansPage;