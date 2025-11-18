"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl relative">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-2xl -z-10"></div>

                <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
                    Welcome Back
                </h2>

                {error && (
                    <p className="text-red-400 text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block mb-1 text-gray-200 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white/10 transition"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-200 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white/10 transition"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-300 text-sm">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-400 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
