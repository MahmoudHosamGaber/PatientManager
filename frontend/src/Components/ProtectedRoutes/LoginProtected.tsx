import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
const LoginProtected = () => {
    const { user } = useAuth();
    if (user) return <Outlet />;
    return <Navigate to={"/login"} />;
};

export default LoginProtected;
