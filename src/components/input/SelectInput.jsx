import PropTypes from "prop-types";
import Label from "../common/Label";
import InputError from "../common/InputError";
import Select from "../common/Select";

const SelectInput = ({
    label,
    name,
    options,
    errorMessage,
    required = true,
    value,
    handleChange,
    isDisabled,
    isFocused,
    className,
    variant,
}) => {
    return (
        <div className="w-full mb-6">
            <Label htmlFor={name} value={`${label} ${required ? "*" : ""}`} />
            <Select
                name={name}
                value={value}
                options={options}
                handleChange={handleChange}
                isDisabled={isDisabled}
                isFocused={isFocused}
                className={className}
                variant={variant}
                isError={!!errorMessage}
                required={required}
            />
            <InputError message={errorMessage} />
        </div>
    );
};

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "error", "disabled"]),
};

export default SelectInput;
