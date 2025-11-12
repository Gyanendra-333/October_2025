import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex items-center justify-center bg-slate-700 min-h-screen">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">
                        Register your account
                    </CardTitle>
                    <CardDescription>
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Login
                        </a>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submitHandler} className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid gap-2 relative">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </a>
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
                                className="absolute right-3 top-9 text-sm text-gray-300 hover:text-white"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* ✅ Button now inside form */}
                        <Button type="submit" className="w-full mt-3">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
