"use client";
import { useEffect, useState } from "react";

type Topic = { id: string; name: string; description: string };
type SubscribedTopics = { [key: string]: boolean }; // Tracks subscriptions per topic

export default function NewslettersPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [subscribedTopics, setSubscribedTopics] = useState<SubscribedTopics>({});
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        async function fetchTopics() {
            const response = await fetch("/api/newsletters/topics");
            const data = await response.json();
            if (response.ok) setTopics(data);
        }
        fetchTopics();
    }, []);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsValidEmail(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value));
    };

    const toggleSubscription = async (topicId: string) => {
        if (subscribedTopics[topicId]) return; // Already subscribed, prevent duplicate

        if (activeTopic === topicId) {
            setActiveTopic(null); // Hide email input
        } else {
            setActiveTopic(topicId); // Show email input
        }
    };

    const subscribe = async (topicId: string | null) => {
        if (!isValidEmail || !topicId) return; // ✅ Ensure topicId is not null

        //console.log("Subscribing to topic:", topicId); // ✅ Debugging

        const response = await fetch("/api/newsletters/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, topicId }), // ✅ Ensure topicId is included
        });

        const data = await response.json();
        if (response.ok) {
            setSubscribedTopics((prev) => ({ ...prev, [topicId]: true }));
            setMessages((prev) => ({ ...prev, [topicId]: "Subscribed successfully!" }));
            setActiveTopic(null); // ✅ Hide email input after subscription
        } else {
            console.error("Subscription Error:", data.error); // ✅ Debugging
            setMessages((prev) => ({ ...prev, [topicId]: data.error || "Subscription failed." }));
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-black mb-6">Subscribe to Our Newsletters</h1>
            <p className="text-gray-600 text-center mb-6">
                Stay up-to-date with the latest news and updates by subscribing to our newsletters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.length > 0 ? (
                    topics.map((topic) => (
                        <div key={topic.id} className="p-6 bg-gray-100 rounded-lg shadow-md relative">
                            {/* ✅ Show checkmark if subscribed */}
                            {subscribedTopics[topic.id] && (
                                <span className="absolute top-2 right-2 text-green-600 text-xl">✅</span>
                            )}

                            <h2 className="text-xl font-semibold">{topic.name}</h2>
                            <p className="text-gray-600 mt-2">{topic.description}</p>

                            {/* ✅ Subscribe button (toggles email input) */}
                            <div className="flex items-center mt-4">
                                {activeTopic === topic.id && !subscribedTopics[topic.id] && (
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter email"
                                        className="text-gray-600 border p-2 rounded w-full mr-2"
                                    />
                                )}

                                <button
                                    onClick={() => (activeTopic === topic.id && isValidEmail ? subscribe(topic.id) : toggleSubscription(topic.id))}
                                    className={`px-3 py-2 rounded text-sm transition ${subscribedTopics[topic.id]
                                            ? "bg-green-600 text-white cursor-default"
                                            : activeTopic === topic.id && isValidEmail
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-400 text-gray-800"
                                        }`}
                                    disabled={subscribedTopics[topic.id]}
                                >
                                    {subscribedTopics[topic.id] ? "Subscribed" : activeTopic === topic.id ? "Confirm" : "Subscribe"}
                                </button>
                            </div>

                            {messages[topic.id] && <p className="text-center text-green-600 mt-3">{messages[topic.id]}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No topics available.</p>
                )}
            </div>
        </div>
    );
}