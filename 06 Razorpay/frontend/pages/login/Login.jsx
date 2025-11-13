import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // submit form
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Login Response:", res?.data);
            toast.success(res?.data?.message || "Login Successful!");

            // Clear form
            setFormData({
                email: "",
                password: "",
            });

            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error?.response?.data?.message || "Login Failed!");
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-300 min-h-screen">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">
                        Login to your account
                    </CardTitle>
                    <CardDescription>
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submitHandler} className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2 relative">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full mt-3">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
