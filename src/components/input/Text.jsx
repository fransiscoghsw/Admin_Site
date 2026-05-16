import PropTypes from "prop-types";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";

const Text = ({
    label,
    name,
    variant,
    errorMessage,
    required = true,
    ...inputProps
}) => {
    return (
        <div className="w-full mb-6">
            <Label htmlFor={name} value={`${label} ${required ? "*" : ""}`} />

            <Input
                name={name}
                type={"text"}
                variant={variant}
                isError={!!errorMessage}
                required={required}
                {...inputProps} // inputProps akan mencakup register dari react-hook-form
            />
            <InputError message={errorMessage} />
        </div>
    );
};

Text.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    variant: PropTypes.string,
};

export default Text;
