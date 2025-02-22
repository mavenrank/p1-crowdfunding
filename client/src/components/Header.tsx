import { useState } from "react";
import SignInModal from "@/components/SignInModal";
import SearchBar from "@/components/SearchBar";
import Slider from "react-slick";

const categories = [
    { name: "Technology", subcategories: ["AI", "Blockchain", "Gadgets"] },
    { name: "Arts", subcategories: ["Music", "Film", "Photography"] },
    { name: "Health", subcategories: ["Fitness", "Mental Health", "Medical Tech"] },
    { name: "Education", subcategories: ["E-learning", "Books", "Research"] },
    { name: "Gaming", subcategories: ["Board Games", "Video Games", "Esports"] },
];

//CrowdRise – Elevate your project with community support.

const Header = () => {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <img src="/logo.png" alt="Company Logo" className="h-10 cursor-pointer" />

                {/* Search Bar */}
                <SearchBar />

                {/* Buttons */}
                <div className="flex gap-4">
                    <button className="text-blue-600" onClick={() => setIsModalOpen(true)}>Sign In</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Get Started</button>
                </div>
            </div>

            {/* Sign In Modal */}
            <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Categories Carousel */}
            <div className="bg-gray-100 py-2">
                <Slider {...settings} className="px-6">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="p-2 text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </Slider>
            </div>{/* Categories Carousel */}
            <div className="bg-gray-100 py-2">
                <Slider {...settings} className="px-6">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="p-2 text-blue-600 hover:text-blue-800"
                            onClick={() => setActiveCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </Slider>
            </div>

            {/* Subcategories Pop-up */}
            {activeCategory && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4">
                    <h3 className="text-lg font-bold mb-2">{activeCategory}</h3>
                    <ul className="flex gap-4">
                        {categories.find((c) => c.name === activeCategory)?.subcategories.map((sub) => (
                            <li key={sub} className="text-blue-500 cursor-pointer hover:underline">
                                {sub}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-2 text-red-600" onClick={() => setActiveCategory(null)}>
                        Close
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;