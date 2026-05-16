import PropTypes from "prop-types";

const Input = (props) => {
    const {
        type,
        name,
        value,
        className,
        variant = "primary",
        required,
        handleChange,
        placeholder,
        isError,
        isDisabled,
    } = props;

    return (
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            className={`block w-full px-4 py-2 text-sm border-2 rounded-2xl shadow 
                ${
                    isError
                        ? "border-red-500 focus:border-red-700 focus:ring-red-300"
                        : `input-${variant} focus:border-[#000080] focus:ring-[#000080]`
                } 
                focus:ring-1 outline-none transition-all duration-200
                ${className}`}
            required={required}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            disabled={isDisabled}
        />
    );
};

// membuat validasi untuk props yang sudah dibuat
Input.propTypes = {
    type: PropTypes.oneOf([
        "text",
        "email",
        "password",
        "number",
        "date",
        "file",
        "search",
    ]),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "primary-outline",
        "primary-outline-search",
        "error",
        "disabled",
    ]),
    required: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

export default Input;
