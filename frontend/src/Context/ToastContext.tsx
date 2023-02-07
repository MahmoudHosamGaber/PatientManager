import { createContext, useContext, useState } from "react";
import { AlertFields } from "../global";

type Value = {
    alert: AlertFields;
    toast: {
        success: (message: string) => void;
        error: (message: string) => void;
        close: () => void;
    };
};

const toastContext = createContext<Value>({} as Value);
export const useToast = () => {
    return useContext(toastContext);
};
const ToastProvider = ({ children }: any) => {
    const [alert, setAlert] = useState<AlertFields>({
        isOpen: false,
        severity: "error",
        message: "",
    });
    const toast = {
        success: (message: string) =>
            setAlert({
                isOpen: true,
                severity: "success",
                message,
            }),
        error: (message: string) =>
            setAlert({
                isOpen: true,
                severity: "error",
                message,
            }),
        close: () =>
            setAlert((prev) => ({
                ...prev,
                isOpen: false,
            })),
    };

    return (
        <toastContext.Provider value={{ alert, toast }}>
            {children}
        </toastContext.Provider>
    );
};

export default ToastProvider;
