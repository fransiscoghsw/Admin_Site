import { FiSearch } from "react-icons/fi";
import Input from "../common/Input";

const SearchInput = ({ value, onChange }) => {
    return (
        <div className="relative w-full min-w-[200px]">
            <Input
                type="text"
                placeholder="Cari..."
                value={value}
                variant="primary"
                handleChange={(e) => onChange(e.target.value)}
            />
            <FiSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
            />
        </div>
    );
};

export default SearchInput;
