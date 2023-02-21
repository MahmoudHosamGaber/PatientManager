import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { PatientRecord } from "../../global";
import UpdatePatientModal from "./UpdatePatientModal";
type Props = {
    patient: PatientRecord;
    setPatients: React.Dispatch<React.SetStateAction<PatientRecord[]>>;
};
const PatientCard = ({ patient, setPatients }: Props) => {
    const firstName =
        patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1);
    const lastName =
        patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1);
    const fullName = firstName + " " + lastName;
    const navigate = useNavigate();
    return (
        <Card>
            <CardActionArea
                onClick={() => navigate(`/patients/${patient._id}`)}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                        }}
                    >
                        <PersonIcon />
                        <Typography gutterBottom variant="h5" component="div">
                            {fullName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <PhoneIcon />
                        <Typography>{patient.phonenumber}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <UpdatePatientModal
                    patient={patient}
                    setPatients={setPatients}
                />
            </CardActions>
        </Card>
    );
};

export default PatientCard;
