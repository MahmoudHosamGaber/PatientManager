import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
export const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "2rem",
    width: "max(50%, 25rem)",
}));
