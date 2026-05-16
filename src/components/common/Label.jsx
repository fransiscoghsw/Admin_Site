import PropTypes from "prop-types";

const Label = (props) => {
    const { htmlFor, value, className } = props;

    return (
        <label
            htmlFor={htmlFor}
            className={`mb-2 text-base font-medium block ${className}`}
        >
            {value}
        </label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
    value: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Label;
