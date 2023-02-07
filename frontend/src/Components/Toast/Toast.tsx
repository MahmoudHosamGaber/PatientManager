import { Alert, Snackbar } from "@mui/material";
import { useToast } from "../../Context/ToastContext";
import { AlertFields } from "../../global";

const Toast = () => {
    const { alert, toast } = useToast();
    const handleAlertClose = () => toast.close();
    return (
        <Snackbar
            open={alert.isOpen}
            autoHideDuration={6000}
            onClose={handleAlertClose}
        >
            <Alert
                onClose={handleAlertClose}
                severity={alert.severity}
                variant="filled"
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
