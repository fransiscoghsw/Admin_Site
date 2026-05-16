import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Select = (props) => {
    const {
        name,
        value,
        defaultValue,
        className,
        variant = "primary",
        required,
        isFocused,
        handleChange,
        isError,
        isDisabled,
        options,
    } = props;

    const selectRef = useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    return (
        <select
            name={name}
            id={name}
            value={value}
            defaultValue={defaultValue}
            className={`block w-full px-4 py-2 text-sm border-2 rounded-2xl shadow 
                ${
                    isError
                        ? "border-red-500 focus:border-red-700 focus:ring-red-300"
                        : `input-${variant} focus:border-[#000080] focus:ring-[#000080]`
                } 
                focus:ring-1 outline-none transition-all duration-200
                ${className}`}
            ref={selectRef}
            required={required}
            onChange={handleChange}
            disabled={isDisabled}
        >
            <option value="" disabled>
                Pilih opsi...
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Validasi prop menggunakan PropTypes
Select.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "error", "disabled"]),
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Select;
