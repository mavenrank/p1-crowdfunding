
"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition, IconDefinition, IconLookup } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Category {
    id: string;
    name: string;
    icon: string; // FontAwesome icon name
    sub_categories: string[];
}

export default function CategoryNav() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="relative">
            {/* Scrollable Categories */}
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-4 bg-gray-100">
                {categories.map((category) => {
                    // Lookup FontAwesome icon
                    const iconLookup: IconLookup = { prefix: "fas", iconName: category.icon as any };
                    const icon: IconDefinition = findIconDefinition(iconLookup) || faCircle;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.name)}
                            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600"
                        >
                            <FontAwesomeIcon icon={icon} className="text-2xl" />
                            <span className="text-sm">{category.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Subcategory Pane */}
            {activeCategory && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md p-4">
                    <h3 className="text-lg font-semibold">{activeCategory}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {categories
                            .find((c) => c.name === activeCategory)
                            ?.sub_categories.map((sub) => (
                                <button key={sub} className="text-blue-600 hover:underline text-sm">
                                    {sub}
                                </button>
                            ))}
                    </div>
                    <button
                        className="mt-3 text-red-600 text-sm"
                        onClick={() => setActiveCategory(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
