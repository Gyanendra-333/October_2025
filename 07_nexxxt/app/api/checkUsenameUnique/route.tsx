"use client";

import { useState } from "react";

export default function CheckUsernamePage() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "available" | "taken">(null);

    const handleCheck = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch(`/api/check-username?username=${username}`);
            const data = await res.json();

            if (data.exists) {
                setStatus("taken");
            } else {
                setStatus("available");
            }

        } catch (err) {
            console.error("Check username Error", err);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-5">
                    Check Username Availability
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-blue-600"
                    />

                    <button
                        onClick={handleCheck}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Checking..." : "Check Username"}
                    </button>

                    {status === "available" && (
                        <p className="text-green-600 text-center font-medium">
                            ✔ Username is available
                        </p>
                    )}

                    {status === "taken" && (
                        <p className="text-red-600 text-center font-medium">
                            ✖ Username already taken
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
