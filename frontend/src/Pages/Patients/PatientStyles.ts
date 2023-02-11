import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

export const PatientContainer = styled(Container)(() => ({
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
    gap: "1rem",
}));
