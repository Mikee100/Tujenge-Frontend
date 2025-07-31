import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoansPage() {
  const [showModal, setShowModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('3');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [collateral, setCollateral] = useState('');
  const [contributionConfirmed, setContributionConfirmed] = useState(false);
  const [expandedLoanId, setExpandedLoanId] = useState(null);

  // Dummy loan data (replace with real data from API)
  const loans = [
    {
      id: 1,
      amount: 5000,
      status: 'Approved',
      date: '2025-07-30',
      purpose: 'Medical emergency',
      duration: '3 months',
    },
    {
      id: 2,
      amount: 10000,
      status: 'Pending',
      date: '2025-07-25',
      purpose: 'Business capital',
      duration: '6 months',
    },
  ];

  const chamaId = 1; // Replace with actual chama ID logic

  const toggleLoanDetails = (loanId) => {
    setExpandedLoanId(expandedLoanId === loanId ? null : loanId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loanAmount || !loanPurpose || !contributionConfirmed) {
      toast.error('Please complete all required fields.');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('You must be logged in to request a loan.');
      return;
    }

    const loanData = {
      amount: loanAmount,
      repayment_period: repaymentPeriod,
      purpose: loanPurpose,
      collateral: collateral,
    };

    try {
      await axios.post(`/api/chama/${chamaId}/loans/`, loanData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      toast.success('Loan request submitted successfully!');
      setShowModal(false);
      setLoanAmount('');
      setRepaymentPeriod('3');
      setLoanPurpose('');
      setCollateral('');
      setContributionConfirmed(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || 'Failed to submit loan request.'
      );
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">My Loans</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#047056] hover:bg-[#035d47] text-white px-4 py-2 rounded text-sm"
        >
          Request Loan
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Ksh {loan.amount.toLocaleString()}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    loan.status === 'Approved'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {loan.status}
                </p>
                <p className="text-xs text-gray-500">Date: {loan.date}</p>
              </div>
              <button
                onClick={() => toggleLoanDetails(loan.id)}
                className="text-blue-600 hover:underline text-sm"
              >
                {expandedLoanId === loan.id ? 'Hide Details' : 'View More'}
              </button>
            </div>

            {expandedLoanId === loan.id && (
              <div className="mt-4 text-sm text-gray-600 border-t pt-2">
                <p>
                  <span className="font-medium">Purpose:</span>{' '}
                  {loan.purpose}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{' '}
                  {loan.duration}
                </p>
              </div>
            )}
          </div>
        ))}
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
}
