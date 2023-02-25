import { styled } from "@mui/material/styles";
import { Container, Box, CardActionArea } from "@mui/material";

export const AppointmentPage = styled(Container)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    paddingBlock: "1rem",
    "& > *": {
        width: "100%",
    },
}));

export const AppointmentContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 20rem)",
    gap: "1rem",
}));

export const AppointmentActionArea = styled(CardActionArea)(() => ({
    padding: "1rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    "& > *": {
        width: "100%",
    },
}));
