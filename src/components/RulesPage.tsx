"use client";
import { useState } from "react";

const oceanBlue = "#e7e8e9"; // ✅ Updated to ocean blue brand color

const rules = [
    {
        title: "1. General Guidelines",
        content: "All fundraisers must be honest about their campaigns and provide accurate details. Misrepresentation, fraudulent activities, or misleading claims will result in immediate suspension.",
    },
    {
        title: "2. Who Can Start a Campaign?",
        content: "Anyone over the age of 18 can create a campaign. Organizations, charities, and individuals must comply with local laws and platform verification processes before collecting funds.",
    },
    {
        title: "3. Acceptable Campaigns",
        content: "Campaigns should be for legal, ethical, and permissible purposes. Prohibited categories include weapons, drugs, gambling, violence, or any activity that promotes hate or discrimination.",
    },
    {
        title: "4. Donation & Fund Usage",
        content: "Funds must be used solely for the stated purpose in the campaign description. Campaign creators may be required to provide proof of fund utilization if requested.",
    },
    {
        title: "5. Payment & Withdrawal Rules",
        content: "Withdrawals are only available to verified campaign owners. Payments are processed securely, and withdrawals are subject to a processing period based on payment provider policies.",
    },
    {
        title: "6. Refund & Dispute Policy",
        content: "Donations are generally non-refundable. However, in cases of fraud or campaign violations, affected donors may request a refund within a specified timeframe.",
    },
    {
        title: "7. Community Conduct & Respect",
        content: "Users are expected to maintain respectful interactions. Harassment, threats, or inappropriate behavior towards donors or campaign owners will not be tolerated.",
    },
    {
        title: "8. Compliance with Laws & Taxes",
        content: "Campaign organizers are responsible for complying with all applicable tax laws in their region. Crowdfunding income may be taxable, and users should seek legal or financial advice where necessary.",
    },
    {
        title: "9. Account Suspension & Violations",
        content: "Accounts found in violation of these rules may face warnings, temporary suspensions, or permanent bans, depending on the severity of the breach.",
    },
];

export default function RulesPage() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header */}
            <h1 className="text-4xl text-gray-600 font-bold text-center" >
                Platform Rules & Guidelines
            </h1>
            <p className="text-gray-600 text-center mb-8">
                Please review our guidelines carefully to ensure a safe and transparent crowdfunding experience.
            </p>

            {/* Rules Section */}
            <div className="space-y-4">
                {rules.map((rule, index) => (
                    <div key={index} className="border rounded-lg shadow-md">
                        <button
                            className={`w-full text-left px-4 py-3 font-semibold transition duration-300 ${
                                openIndex === index ? "text-gray-800" : "text-blue-600"
                            }`}
                            style={{
                                backgroundColor: openIndex === index ? oceanBlue : "#f0f4f8",
                            }}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        >
                            {rule.title}
                        </button>
                        {openIndex === index && (
                            <div className="p-4 text-gray-700 bg-white">{rule.content}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}