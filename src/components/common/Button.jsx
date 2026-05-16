const Button = (props) => {
    const {
        variant = "primary",
        size = "md",
        type = "submit",
        onClick,
        disabled = false,
        className = "",
        children,
        icon,
        processing,
    } = props;

    const baseClasses = `flex items-center gap-x-2 justify-center font-medium rounded-2xl focus:outline-none transition ease-in-out duration-300`;

    const variantClasses = {
        primary:
            "bg-[#000080] border-2 border-[#000080] text-white hover:text-[#000080] hover:bg-white hover:border-[#000080]",
        primary_outline:
            "bg-white border-2 border-[#000080] text-[#000080] hover:text-white hover:bg-[#000080]",
        secondary:
            "bg-gray-500 text-white hover:bg-gray-600 focus:ring focus:ring-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring focus:ring-red-300",
        create: "bg-[#138A36] text-white hover:shadow-[0_4px_15px_0_#138A364D] focus:ring focus:[#42a15e]",
        read: "bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300",
        update: "bg-[#FFA90B] text-white hover:shadow-[0_4px_15px_0_#FFA90B4D] focus:ring focus:ring-[#ffba3b]",
        delete: "bg-[#E71D36] text-white hover:shadow-[0_4px_15px_0_#E71D364D] focus:ring focus:ring-[#eb4a5e]",
    };

    const sizeClasses = {
        sm: "px-5 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-7 py-3.5 text-lg",
    };

    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:opacity-90";

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    return (
        <button type={type} className={classes} onClick={onClick}>
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
