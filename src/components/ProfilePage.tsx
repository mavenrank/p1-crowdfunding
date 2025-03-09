"use client";
import { Campaign } from "@/types/Campaign";
import { Donation } from "@/types/Donation";
import { useEffect, useState } from "react";

export default function ProfilePage({ userId }: { userId: string }) {
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [editing, setEditing] = useState(false);
    const [profileData, setProfileData] = useState({ full_name: "", bio: "", avatar_url: "" });

    useEffect(() => {
        async function fetchUserProfile() {
            setLoading(true);

            try {
                const response = await fetch(`/api/profile?userId=${userId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Failed to fetch profile");

                setUser(data.user);
                setRole(data.user.role);
                setProfileData({
                    full_name: data.profile.full_name || "",
                    bio: data.profile.bio || "",
                    avatar_url: data.profile.avatar_url || "",
                });

                if (data.user.role === "fundraiser") {
                    setCampaigns(data.campaigns || []);
                } else {
                    setDonations(data.donations || []);
                }
            } catch (error) {
                console.error("Error loading profile:", error);
            }

            setLoading(false);
        }

        fetchUserProfile();
    }, [userId]);

    const handleUpdateProfile = async () => {
        setEditing(false);

        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, profileData }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to update profile");

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">{role === "fundraiser" ? "Fundraiser Profile" : "Donor Profile"}</h1>

            <div className="flex items-center space-x-4 mt-4">
                <img src={profileData.avatar_url || "/default-avatar.png"} alt="Avatar" className="w-16 h-16 rounded-full" />
                <div>
                    <p className="text-lg font-semibold">{profileData.full_name}</p>
                    <p className="text-gray-600">{profileData.bio}</p>
                </div>
                <button onClick={() => setEditing(true)} className="ml-auto bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
            </div>

            {editing && (
                <div className="mt-4">
                    <input type="text" placeholder="Full Name" value={profileData.full_name} onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })} className="border p-2 w-full rounded" />
                    <input type="text" placeholder="Bio" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className="border p-2 w-full rounded mt-2" />
                    <button onClick={handleUpdateProfile} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Save</button>
                </div>
            )}

            {role === "fundraiser" ? (
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-700">Your Campaigns</h2>
                    {campaigns.length > 0 ? (
                        <ul className="mt-2">
                            {campaigns.map((campaign) => (
                                <li key={campaign.id} className="border p-3 mt-2 rounded shadow-sm flex justify-between">
                                    <span>{campaign.title}</span>
                                    <span className="text-green-600">${campaign.total_raised}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">You haven't created any campaigns yet.</p>
                    )}
                </div>
            ) : (
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-700">Your Donations</h2>
                    {donations.length > 0 ? (
                        <ul className="mt-2">
                            {donations.map((donation, index) => (
                                <li key={index} className="border p-3 mt-2 rounded shadow-sm flex justify-between">
                                    <span>{donation.campaign_title || "Unknown Campaign"}</span>
                                    <span className="text-blue-600">${donation.total_donated.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No donations made yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
