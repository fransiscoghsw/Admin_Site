import PropTypes from "prop-types";
import { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
    label,
    name,
    errorMessage,
    required = true,
    ...inputProps
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full mb-6 relative">
            <Label htmlFor={name} value={`${label} ${required ? "*" : ""}`} />
            <div className="relative">
                <Input
                    name={name}
                    type={showPassword ? "text" : "password"}
                    variant="primary"
                    isError={!!errorMessage}
                    required={required}
                    {...inputProps}
                />
                <button
                    type="button"
                    className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <FiEyeOff size={20} />
                    ) : (
                        <FiEye size={20} />
                    )}
                </button>
            </div>
            <InputError message={errorMessage} />
        </div>
    );
};

PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
};

export default PasswordInput;
