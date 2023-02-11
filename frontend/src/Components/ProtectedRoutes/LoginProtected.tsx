import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "..";
const LoginProtected = () => {
    const { user } = useAuth();
    if (user)
        return (
            <>
                <NavBar />
                <Outlet />
            </>
        );
    return <Navigate to={"/login"} />;
};

export default LoginProtected;
