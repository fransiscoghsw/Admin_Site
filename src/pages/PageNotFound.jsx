import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/masuk");
    }, [navigate]);

    return null;
};

export default NotFoundRedirect;
