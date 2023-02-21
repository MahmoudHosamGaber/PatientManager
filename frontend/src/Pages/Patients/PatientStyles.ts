import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

export const PatientPage = styled(Container)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
    "& > *": {
        width: "100%",
    },
}));

export const PatientSearchForm = styled("form")(() => ({
    display: "flex",
    gap: "1rem",
}));

export const PatientContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 20rem)",
    gap: "1rem",
}));
