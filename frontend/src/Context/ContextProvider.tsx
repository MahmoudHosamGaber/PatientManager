import { Toast } from "../Components";
import AuthProvider from "./AuthContext";
import ThemeContext from "./ThemeContext";
import ToastProvider from "./ToastContext";

const ContextProvider = ({ children }: any) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <Toast />
                <ThemeContext>{children}</ThemeContext>
            </ToastProvider>
        </AuthProvider>
    );
};

export default ContextProvider;
