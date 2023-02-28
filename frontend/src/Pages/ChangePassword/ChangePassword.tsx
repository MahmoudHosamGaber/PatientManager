import { Box, Button, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import {
    ChangePasswordContainer,
    ChangePasswordForm,
} from "./ChangePasswordStyles";

function ChangePassword() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const token = user?.token;
    const { toast } = useToast();
    const axiosOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");
        const confirmNewPassword = formData.get("confirmNewPassword");
        const username = formData.get("newUsername");
        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const obj = {
                password: currentPassword,
                ...(newPassword ? { newPassword } : {}),
                ...(username ? { username } : {}),
            };
            const response = await axios.put(
                "/api/admin/password",
                obj,
                axiosOptions
            );
            toast.success("Credentials changed successfully");
        } catch (error: AxiosError | any) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    };
    return (
        <ChangePasswordContainer>
            <img src="/ForgotPassword.svg" alt="" />
            <ChangePasswordForm onSubmit={onSubmit}>
                <TextField
                    required
                    variant="outlined"
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                />
                <TextField
                    variant="outlined"
                    label="New Password"
                    name="newPassword"
                    type="password"
                />
                <TextField
                    variant="outlined"
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    type="password"
                />
                <TextField
                    variant="outlined"
                    label="New Username"
                    name="newUsername"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                        "&:hover": {
                            backgroundColor: "#222",
                        },
                    }}
                >
                    Change Credentials
                </Button>
            </ChangePasswordForm>
        </ChangePasswordContainer>
    );
}

export default ChangePassword;
