import PropTypes from "prop-types";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";

const EmailInput = ({
    label,
    name,
    errorMessage,
    required = true,
    ...inputProps
}) => {
    return (
        <div className="w-full mb-6">
            <Label htmlFor={name} value={`${label} ${required ? "*" : ""}`} />
            <Input
                name={name}
                type="email"
                variant="primary"
                isError={!!errorMessage}
                required={required}
                {...inputProps}
            />
            <InputError message={errorMessage} />
        </div>
    );
};

EmailInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
};

export default EmailInput;
