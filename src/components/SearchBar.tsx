import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search campaigns..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
