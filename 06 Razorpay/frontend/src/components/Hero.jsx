import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
    return (
        <section className="bg-slate-200 py-16 mt-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* 🧩 Left Content */}
                <div className="text-center md:text-left space-y-6 md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Discover the Latest <span className="text-blue-600">Trends</span> in Fashion
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Shop smart, shop stylish. Find the best products at unbeatable prices.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                            <ShoppingBag size={18} />
                            Shop Now
                        </Button>
                        <Button
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* 🖼️ Right Image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="https://t4.ftcdn.net/jpg/03/39/60/67/360_F_339606710_pFQOII8MwyEVqXK5vb4XsIaJr13cipWO.jpg"
                        alt="E-Kart Hero Banner"
                        className="w-full max-w-md md:max-w-lg rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
