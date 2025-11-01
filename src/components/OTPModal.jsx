import { useState } from "react";
import { validateOTP, generateOTP } from "../api/api";

function OTPModal({ show, setShow, setOtpVerified, userData }) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    if (!show) return null;

    const handleVerify = () => {
        if (otp.length === 6) {
            validateOTP(otp)
                .then(res => {
                    if (res.status === "success") {
                        setOtpVerified(true);
                        setError("");
                        setShow(false);
                    } else {
                        setError(res.message || "Verification failed. Try again.");
                    }
                })
                .catch(() => setError("Network error. Please try again."));
        } else {
            setError("Please enter a 6-digit OTP");
        }
    };

    const handleResend = () => {
        setOtp("");
        generateOTP(userData.email)
            .then(res => {
                setError("");
                console.log(res);
            })
            .catch(() => setError("Failed to resend OTP"));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6 text-white border border-gray-700">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-center flex-1">Enter OTP</h2>
                    <button
                        onClick={() => setShow(false)}
                        className="text-gray-400 hover:text-white text-2xl ml-4 transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 text-center">
                    Enter the 6-digit code sent to your email or phone.
                </p>

                {/* OTP Input */}
                <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full text-center text-2xl tracking-widest px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white shadow-sm transition-shadow"
                />

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleVerify}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Verify
                    </button>
                    <button
                        onClick={handleResend}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Resend
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-center text-sm font-medium p-2">
                        {error}
                    </p>
                )}

                {/* Cancel Button */}
                <button
                    onClick={() => setShow(false)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default OTPModal;
