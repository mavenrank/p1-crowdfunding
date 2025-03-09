"use client";
import Link from "next/link";

export default function HelpCenter() {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-black mb-6">Help Center</h1>
            <p className="text-gray-600 text-center">
                Need assistance? Find answers to your questions below.
            </p>

            {/* Sections */}
            <div className="mt-8 space-y-6">
                {/* Getting Started */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800">Getting Started</h2>
                    <p className="text-gray-600 mt-2">
                        New to the platform? Learn how to create an account, set up a campaign, and start raising funds.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li><Link href="/help/sign-up" className="text-[#007bff]">How to Sign Up</Link></li>
                        <li><Link href="/help/create-campaign" className="text-[#007bff]">How to Create a Campaign</Link></li>
                        <li><Link href="/help/how-donations-work" className="text-[#007bff]">How Donations Work</Link></li>
                    </ul>
                </section>

                {/* Managing Your Campaign */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800">Managing Your Campaign</h2>
                    <p className="text-gray-600 mt-2">
                        Tips and guides on updating campaigns, tracking donations, and withdrawing funds.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li><Link href="/help/edit-campaign" className="text-[#007bff]">Editing Your Campaign</Link></li>
                        <li><Link href="/help/track-donations" className="text-[#007bff]">Tracking Donations</Link></li>
                        <li><Link href="/help/withdraw-funds" className="text-[#007bff]">Withdrawing Funds</Link></li>
                    </ul>
                </section>

                {/* Donating & Payments */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800">Donating & Payments</h2>
                    <p className="text-gray-600 mt-2">
                        Information on how to donate, payment options, and refund policies.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li><Link href="/help/how-to-donate" className="text-[#007bff]">How to Donate</Link></li>
                        <li><Link href="/help/payment-methods" className="text-[#007bff]">Accepted Payment Methods</Link></li>
                        <li><Link href="/help/refund-policy" className="text-[#007bff]">Refund & Cancellation Policy</Link></li>
                    </ul>
                </section>

                {/* Security & Trust */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800">Security & Trust</h2>
                    <p className="text-gray-600 mt-2">
                        Learn how we keep our platform secure and how to report suspicious activity.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li><Link href="/help/verification" className="text-[#007bff]">Campaign Verification Process</Link></li>
                        <li><Link href="/help/scam-prevention" className="text-[#007bff]">How We Prevent Scams</Link></li>
                        <li><Link href="/help/report-issue" className="text-[#007bff]">Reporting a Problem</Link></li>
                    </ul>
                </section>

                {/* FAQ Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions (FAQ)</h2>
                    <p className="text-gray-600 mt-2">
                        Quick answers to the most commonly asked questions.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li><Link href="/help/faq" className="text-[#007bff]">View All FAQs</Link></li>
                    </ul>
                </section>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-12">
                <h2 className="text-2xl font-bold text-gray-800">Need More Help?</h2>
                <p className="text-gray-600 mt-2">
                    Contact our support team for further assistance.
                </p>
                <Link href="/help/contact" className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-semibold mt-4 inline-block">
                    Contact Support
                </Link>
            </div>
        </div>
    );
}