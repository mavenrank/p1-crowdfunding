import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-1/3">
      <input
        type="text"
        placeholder="Search campaigns..."
        className="w-full p-2 pl-10 border rounded-md focus:outline-none"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-500" />
    </div>
  );
};

export default SearchBar;
