import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const [isAuth, _] = useState(() => {
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken)
            return true;
        return false;
    });

    return isAuth ? <Outlet /> : <Navigate to="/signin" />
}