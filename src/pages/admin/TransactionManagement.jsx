import React, { useEffect, useState } from "react";
import { FaDownload, FaArrowUp, FaArrowDown } from "react-icons/fa";
import api from "../../api/api";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("transactions");
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];

        const enrichedData = await Promise.all(
          data.map(async (tx) => {
            let userName = "Unknown";
            let licenseNo = "N/A";

            try {
              const custRes = await api.get(`customers/${tx.customer_id}`);
              if (custRes.data?.data?.name) {
                userName = custRes.data.data.name;
              }
            } catch {
              try {
                const empRes = await api.get(`employee/${tx.customer_id}`);
                if (empRes.data?.data?.name) {
                  userName = empRes.data.data.name;
                }
              } catch {
                userName = "Unknown";
              }
            }

            try {
              const carRes = await api.get(`cars/${tx.car_id}`);
              licenseNo = carRes.data?.data?.license_no || "N/A";
            } catch {
              licenseNo = "N/A";
            }

            return {
              ...tx,
              userName,
              licenseNo,
            };
          })
        );

        setTransactions(enrichedData);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4 border-gray-200">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Transaction Management</h1>
          <p className="text-gray-600">
            Monitor all financial transactions (credits and debits) related to customer bookings and payments.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">
          <FaDownload /> Download Report
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-semibold text-xs uppercase text-gray-500 bg-gray-100 p-3 rounded-lg">
            <span className="col-span-2 md:col-span-2">Type</span>
            <span className="col-span-2 md:col-span-3 text-right">Amount</span>
            <span className="col-span-2 md:col-span-3">Date</span>
            <span className="col-span-2 md:col-span-2">Customer/Employee</span>
            <span className="col-span-2 md:col-span-2">Car License</span>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {transactions.map((tx) => (
              <div
                key={tx.transaction_id || tx._id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg cursor-pointer border-l-4
                  ${
                    tx.transaction_type?.toLowerCase() === "credit"
                      ? "bg-white border-green-500 hover:bg-green-50"
                      : "bg-white border-red-500 hover:bg-red-50"
                  }`}
              >
                <div className="col-span-2 md:col-span-2 flex items-center">
                  {tx.transaction_type?.toLowerCase() === "credit" ? (
                    <FaArrowUp className="text-green-600 text-lg mr-2" />
                  ) : (
                    <FaArrowDown className="text-red-600 text-lg mr-2" />
                  )}
                  <span className="font-semibold capitalize">
                    {tx.transaction_type}
                  </span>
                </div>

                <div
                  className={`col-span-2 md:col-span-3 flex items-center justify-end font-bold text-base ${
                    tx.transaction_type?.toLowerCase() === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ${tx.transaction_amount?.toFixed(2)}
                </div>

                <div className="col-span-2 md:col-span-3 flex items-center text-gray-600">
                  {new Date(tx.date).toLocaleDateString()}
                </div>

                <div className="col-span-2 md:col-span-2 flex items-center text-gray-700 font-medium">
                  {tx.userName}
                </div>

                <div className="col-span-2 md:col-span-2 flex items-center text-gray-700 font-mono">
                  {tx.licenseNo}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
