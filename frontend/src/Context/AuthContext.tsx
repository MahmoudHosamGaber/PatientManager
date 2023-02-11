import {
    useContext,
    createContext,
    useState,
    SetStateAction,
    Dispatch,
    useEffect,
} from "react";
import { User } from "../global";

type Value = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    logout: () => void;
};
type UseAuth = () => Value;
const authContext = createContext({} as Value);
export const useAuth: UseAuth = () => {
    return useContext(authContext);
};
const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>(null);
    useEffect(() => {
        console.log(user);
    }, [user]);
    const logout = () => {
        setUser(null);
    };
    return (
        <authContext.Provider value={{ user, setUser, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
