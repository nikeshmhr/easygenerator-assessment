import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useForceRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = window.localStorage.getItem("accessToken");
        if (token)
            navigate("/")
    }, [navigate]);
}