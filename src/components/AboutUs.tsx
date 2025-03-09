"use client";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header Section */}
            <h1 className="text-3xl font-bold text-center text-black mb-6">About Us</h1>

            {/* Mission Statement */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
                <p className="text-gray-600 mt-2">
                    We believe in the power of community-driven change. Our crowdfunding platform empowers individuals, non-profits, and businesses 
                    to raise funds for projects that matter. Whether it's a personal emergency, a startup dream, or a social cause, we connect people who need help with those who want to give.
                </p>
            </section>

            {/* How It Works */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-black">1. Start a Campaign</h3>
                        <p className="text-gray-600 mt-2">
                            Share your story, set a fundraising goal, and launch your campaign to the world.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-black">2. Get Support</h3>
                        <p className="text-gray-600 mt-2">
                            Reach out to friends, family, and the community. People can donate and share your cause.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-black">3. Receive Funds</h3>
                        <p className="text-gray-600 mt-2">
                            Easily withdraw funds and put them to work on your mission. No delays, no hassle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Our Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#007bff]">100K+</h3>
                        <p className="text-gray-600">Donors Worldwide</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#007bff]">$50M+</h3>
                        <p className="text-gray-600">Funds Raised</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#007bff]">20K+</h3>
                        <p className="text-gray-600">Successful Campaigns</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Join the Movement</h2>
                <p className="text-gray-600 mt-2">
                    Whether you’re looking to support a cause or start your own campaign, we’re here to help.  
                    Sign up today and be a part of something bigger.
                </p>
                <div className="mt-6">
                    <Link href="/signup" className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-semibold">
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}