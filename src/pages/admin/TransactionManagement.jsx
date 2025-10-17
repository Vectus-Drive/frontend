import React from "react";
import { FaDownload, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TransactionManagement() {
  const transactions = [
    {
      _id: "TX001",
      transaction: "Credit",
      amount: 12500.0,
      date: "2025-10-17",
      customer_id: "C001",
      car_id: "CAR001",
    },
    {
      _id: "TX002",
      transaction: "Debit",
      amount: 550.5,
      date: "2025-10-16",
      customer_id: "C002",
      car_id: "CAR004",
    },
    {
      _id: "TX003",
      transaction: "Credit",
      amount: 9800.0,
      date: "2025-10-15",
      customer_id: "C003",
      car_id: "CAR002",
    },
  ];

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4 border-gray-200">
        <div className="mb-4 md:mb-0">
          <div>
          <h1 className="text-2xl font-bold text-gray-800">Transaction Management</h1>
          <p className="text-gray-600">
            Monitor all financial transactions (credits and debits) related to customer bookings and payments. 
          </p>
        </div>
        </div>
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">
          <FaDownload /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-semibold text-xs uppercase text-gray-500 bg-gray-100 p-3 rounded-lg">
        <span className="col-span-2 md:col-span-1">Type</span>
        <span className="col-span-2 md:col-span-2">Transaction ID</span>
        <span className="col-span-2 md:col-span-2 text-right">Amount</span>
        <span className="col-span-2 md:col-span-3">Date</span>
        <span className="col-span-2 md:col-span-2">Customer</span>
        <span className="col-span-2 md:col-span-2">Car</span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg cursor-pointer border-l-4
              ${
                tx.transaction === "Credit"
                  ? "bg-white border-green-500 hover:bg-green-50"
                  : "bg-white border-red-500 hover:bg-red-50"
              }`}
          >
            <div className="col-span-2 md:col-span-1 flex items-center">
              {tx.transaction === "Credit" ? (
                <FaArrowUp className="text-green-600 text-lg mr-2" />
              ) : (
                <FaArrowDown className="text-red-600 text-lg mr-2" />
              )}
              <span className="font-semibold">{tx.transaction}</span>
            </div>

            <div className="col-span-2 md:col-span-2 flex items-center font-mono text-gray-800">
              {tx._id}
            </div>

            <div className="col-span-2 md:col-span-2 flex items-center justify-end font-bold text-base
              {tx.transaction === 'Credit' ? 'text-green-600' : 'text-red-600'}">
              ${tx.amount.toFixed(2)}
            </div>

            <div className="col-span-2 md:col-span-3 flex items-center text-gray-600">
              {tx.date}
            </div>

            <div className="col-span-2 md:col-span-2 flex items-center text-gray-600 font-mono">
              {tx.customer_id}
            </div>

            <div className="col-span-2 md:col-span-2 flex items-center text-gray-600 font-mono">
              {tx.car_id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
