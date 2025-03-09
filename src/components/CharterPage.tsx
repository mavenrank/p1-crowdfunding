"use client";
import Image from "next/image";
import Link from "next/link";

export default function CharterPage() {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header Section */}
            <h1 className="text-4xl font-bold text-center text-black mb-6">Our Charter</h1>
            <p className="text-gray-600 text-center">
                Empowering change, one campaign at a time. We are committed to transparency, trust, and impact.
            </p>

            {/* Core Values */}
            <section className="mt-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
                        <Image src="/images/integrity.jpg" width={300} height={200} alt="Integrity" className="mx-auto rounded-lg" />
                        <h3 className="text-xl font-semibold text-black mt-3">Integrity</h3>
                        <p className="text-gray-600 mt-2">
                            Every campaign is verified to ensure trust and legitimacy.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
                        <Image src="/images/community.jpg" width={300} height={200} alt="Community" className="mx-auto rounded-lg" />
                        <h3 className="text-xl font-semibold text-black mt-3">Community</h3>
                        <p className="text-gray-600 mt-2">
                            We bring people together to support causes that matter.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
                        <Image src="/images/impact.jpg" width={300} height={200} alt="Impact" className="mx-auto rounded-lg" />
                        <h3 className="text-xl font-semibold text-black mt-3">Impact</h3>
                        <p className="text-gray-600 mt-2">
                            Every dollar raised makes a real difference in people’s lives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Our Commitment</h2>
                <p className="text-gray-600 text-center mt-3">
                    We ensure a secure and supportive environment for all fundraisers and donors.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="p-4 text-center">
                        <Image src="/images/security.jpg" width={400} height={250} alt="Security" className="mx-auto rounded-lg" />
                        <h3 className="text-xl font-semibold text-black mt-3">Security First</h3>
                        <p className="text-gray-600 mt-2">
                            We protect donations with the latest security measures.
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <Image src="/images/transparency.jpg" width={400} height={250} alt="Transparency" className="mx-auto rounded-lg" />
                        <h3 className="text-xl font-semibold text-black mt-3">Full Transparency</h3>
                        <p className="text-gray-600 mt-2">
                            Every donation is tracked, ensuring your funds go where they are needed.
                        </p>
                    </div>
                </div>
            </section>

            {/* How We Help */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center">How We Help</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-xl font-semibold text-black">Instant Fundraising</h3>
                        <p className="text-gray-600 mt-2">
                            Launch a campaign in minutes and start receiving donations immediately.
                        </p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-xl font-semibold text-black">Low Fees</h3>
                        <p className="text-gray-600 mt-2">
                            We keep our platform fees minimal so more funds go to the cause.
                        </p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-xl font-semibold text-black">Dedicated Support</h3>
                        <p className="text-gray-600 mt-2">
                            Our team is here to assist you every step of the way.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center mt-12">
                <h2 className="text-3xl font-bold text-gray-800">Be a Part of the Change</h2>
                <p className="text-gray-600 mt-2">
                    Whether you’re looking to start a campaign or support one, your contributions make a difference.
                </p>
                <div className="mt-6">
                    <Link href="/campaigns/start" className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-semibold">
                        Start a Campaign
                    </Link>
                    <Link href="/donate" className="ml-4 bg-black text-white px-6 py-3 rounded-lg font-semibold">
                        Donate Now
                    </Link>
                </div>
            </section>
        </div>
    );
}