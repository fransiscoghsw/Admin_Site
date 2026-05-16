import { FiSearch } from "react-icons/fi";

const SearchInput = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder={placeholder || "Cari..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <FiSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
            />
        </div>
    );
};

export default SearchInput;
