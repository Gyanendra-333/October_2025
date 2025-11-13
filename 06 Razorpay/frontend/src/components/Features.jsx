import React from "react";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

const Features = () => {
    const features = [
        {
            id: 1,
            icon: <Truck size={32} className="text-blue-600" />,
            title: "Fast Delivery",
            desc: "Get your products delivered to your doorstep quickly and safely.",
        },
        {
            id: 2,
            icon: <ShieldCheck size={32} className="text-blue-600" />,
            title: "Secure Payment",
            desc: "We provide multiple safe and encrypted payment options.",
        },
        {
            id: 3,
            icon: <Headphones size={32} className="text-blue-600" />,
            title: "24/7 Support",
            desc: "Our customer support team is available around the clock.",
        },
        {
            id: 4,
            icon: <RotateCcw size={32} className="text-blue-600" />,
            title: "Easy Returns",
            desc: "Hassle-free returns and exchanges within 7 days.",
        },
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Why Shop With <span className="text-blue-600">E-Kart</span>?
                </h2>
                <p className="text-gray-600 mb-12">
                    We make online shopping fast, easy, and secure — just for you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col items-center text-center p-6 bg-slate-100 rounded-2xl shadow-sm hover:shadow-md transition"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
