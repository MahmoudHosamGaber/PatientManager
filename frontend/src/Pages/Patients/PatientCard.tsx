import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PatientRecord } from "../../global";
type Props = {
    patient: PatientRecord;
};
const PatientCard = ({ patient }: Props) => {
    const firstName =
        patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1);
    const lastName =
        patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1);
    const fullName = firstName + " " + lastName;
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/patients/${patient._id}`)}>
            <CardActionArea>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            {fullName}
                        </Typography>
                        <Typography>{patient.phonenumber}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PatientCard;
