import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

export const ChangePasswordContainer = styled(Container)(({ theme }) => ({
    display: "grid",
    gap: "5rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "center",
    position: "relative",
    top: 0,
    translate: "0 50%",
    [theme.breakpoints.down("md")]: {
        "& img": {
            display: "none",
        },
        gridTemplateColumns: "1fr",
    },
}));

export const ChangePasswordForm = styled("form")(() => ({
    display: "flex",
    gap: "1.5rem",
    flexDirection: "column",
    justifyContent: "center",
}));
