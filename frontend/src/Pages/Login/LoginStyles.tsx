import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginButton = styled(Button)({
    background: "black",
    "&:hover": {
        background: "#222",
    },
});

export const LoginContainer = styled(Box)({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginInline: "3rem ",
    "& > *": {
        width: "100%",
    },
    "& > img": {
        display: { md: "block", xs: "none" },
    },
});

export const LoginForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    padding: "3rem",
});
