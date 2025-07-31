import { useState } from "react";

export default function MpesaPayment() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    const accesstoken = localStorage.getItem("access"); 
    if (!accesstoken) {
      setMessage("You're not logged in.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/mpesa/stk-push/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify({
          phone_number: phone,
          amount: amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("STK Push sent! Check your phone.");
      } else {
        setMessage(data.detail || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send payment.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Make a Payment via M-Pesa</h2>
      <input
        type="text"
        placeholder="Phone number (e.g. 0712345678)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Pay Now
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
