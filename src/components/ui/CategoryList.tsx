"use client";

import { useState, useEffect, useRef } from "react";
import CategoryIcon from "./CategoryIcon";

interface Category {
  id: string;
  name: string;
  icon_name: string; // FontAwesome icon name
  sub_categories: { name: string }[]; // ✅ Define it as an array of objects
}

const CategoryList = () => {
  //const [categories, setCategories] = useState<{ name: string; icon_name: string, id: string; subcategories: string[] }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // ✅ Ensure it's an array
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories"); // ✅ Replace with your API endpoint
        const data = await response.json();
        // ✅ Debug: Check API response
        console.log("Fetched Categories:", data);
        setCategories(Array.isArray(data) ? data : []); // ✅ Only set if it's an array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();

    // ✅ Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleSubcategorySelect = (subcategory: string) => {
  setSelectedSubcategories((prev) => ({
    ...prev,
    [subcategory]: !prev[subcategory],
  }));
};

return (
  <div className="relative bg-white py-3 px-4 rounded-lg shadow-sm">
    {/* Scrollable Categories */}
    <div className="flex space-x-3 bg-white overflow-x-auto scrollbar-hide p-2 bg-gray-100">
      {categories.map((category) => {
        console.log("Rendering Category:", category); // ✅ Debug: Check each category
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.name)}
            className={`flex flex-col items-center p-3 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-md ${activeCategory === category.name ? "border-b-2 border-blue-600" : ""
              }`}
          >
            <CategoryIcon iconName={category.icon_name} active={activeCategory === category.name} />
            <span className="text-gray-700 text-xs font-small">{category.name}</span>
          </button>
        );
      })}
    </div>
    {/* Subcategory Dropdown Panel */}
    {activeCategory && (
      <div ref={dropdownRef} className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-10">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-700">{activeCategory}</h3>
          <button onClick={() => setActiveCategory(null)} className="text-red-500 hover:text-red-700">
            ✖
          </button>
        </div>

        {/* Subcategory List */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {categories
            .find((c) => c.name === activeCategory)
            ?.sub_categories.map((sub) => (
              <label key={sub.name} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubcategories[sub.name] || false}
                  onChange={() => handleSubcategorySelect(sub.name)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{sub.name}</span>
              </label>
            ))}
        </div>
      </div>
    )}
  </div>
);

};
export default CategoryList;