import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginButton, LoginContainer, LoginForm } from "./LoginStyles";
import { useAuth } from "../../Context/AuthContext";
import { User } from "../../global";
import { useToast } from "../../Context/ToastContext";
const Login = () => {
    const { toast } = useToast();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { setUser } = useAuth();
    const navigate = useNavigate();
    const handleSubmission = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const username = formData.get("username");
            const password = formData.get("password");
            const res: User = await axios.post(
                "http://localhost:8000/api/admin/login",
                {
                    username,
                    password,
                }
            );
            setUser(res);
            navigate("/");
        } catch (error) {
            toast.error((error as AxiosError).message);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <LoginContainer>
                    <img
                        src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
                        alt=""
                        className="img-fluid mb-3 d-none d-md-block"
                        style={{
                            maxWidth: "50%",
                        }}
                    />
                    <LoginForm onSubmit={handleSubmission}>
                        <TextField
                            fullWidth
                            required
                            name="username"
                            variant="outlined"
                            label="Username"
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password *
                            </InputLabel>
                            <OutlinedInput
                                fullWidth
                                required
                                label="Password"
                                name="password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <LoginButton
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            SIGN IN
                        </LoginButton>
                    </LoginForm>
                </LoginContainer>
            </Box>
        </>
    );
};

export default Login;
