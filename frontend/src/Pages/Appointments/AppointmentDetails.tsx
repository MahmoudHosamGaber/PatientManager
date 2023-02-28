import { Button, Divider, Tooltip, Typography, Zoom } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../Components";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { AppointmentRecord, PatientRecord } from "../../global";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IconBox } from "./AppointmentStyles";
import UpdateAppointmentModal from "./UpdateAppointmentModal";

const AppointmentDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { toast } = useToast();
    const [appointment, setAppointment] = useState<AppointmentRecord>();
    const [patient, setPatient] = useState<PatientRecord>();
    const [loading, setLoading] = useState(true);
    const authorization = {
        headers: {
            authorization: `Bearer ${user?.token}`,
        },
    };
    const getAppointment = async (id: string) => {
        try {
            const res = await axios.get(
                `/api/appointment/${id}`,
                authorization
            );
            setAppointment(res.data);
            await getPatient(res.data.patient);
            setLoading(false);
        } catch (error: AxiosError | any) {
            const message: string =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            toast.error(message);
            setLoading(false);
        }
    };
    const getPatient = async (id: string) => {
        try {
            const res = await axios.get(`/api/patient/${id}`, authorization);
            setPatient(res.data);
        } catch (error: AxiosError | any) {
            const message: string =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    };
    const markAsPayed = async (id: string) => {
        try {
            const res = await axios.put(
                `/api/appointment/${id}`,
                { paid: appointment?.cost },
                authorization
            );
            setAppointment(res.data);
            toast.success("Appointment marked as paid");
        } catch (error: AxiosError | any) {
            const message: string =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    };

    useEffect(() => {
        if (!id) return;
        getAppointment(id);
    }, [id]);
    if (loading || !appointment || !patient) return <Loader open={loading} />;
    const firstName =
        patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1);
    const lastName =
        patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1);

    const patientName = `${firstName} ${lastName}`;
    const date = new Date(appointment.date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
    }).format(date);
    enum Status {
        paid = "Paid",
        unpaid = "Unpaid",
    }
    const status =
        appointment.cost === appointment.paid ? Status.paid : Status.unpaid;
    return (
        <Container
            sx={{
                paddingBlock: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Typography variant="h3" textAlign="center">
                {appointment.title}
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <Tooltip
                    title="Patient Page"
                    TransitionComponent={Zoom}
                    arrow
                    placement="top"
                >
                    <IconBox
                        onClick={() => navigate(`/patients/${patient._id}`)}
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <PersonIcon fontSize="large" />
                        <Typography variant="h4">{patientName}</Typography>
                    </IconBox>
                </Tooltip>
                <IconBox>
                    <CalendarTodayIcon />
                    <Typography variant="h5">{formattedDate}</Typography>
                </IconBox>
            </Box>

            <Typography variant="h5">
                Status:{" "}
                <Box
                    component="span"
                    sx={{
                        color: status === Status.paid ? "primary.main" : "red",
                    }}
                >
                    {status}
                </Box>
            </Typography>
            <Typography variant="h5">
                Cost: {appointment.cost}
                {status === Status.unpaid && ` - Paid: ${appointment.paid}`}
            </Typography>
            <Box display={"flex"} gap="1rem">
                {status === Status.unpaid && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => markAsPayed(appointment._id)}
                    >
                        Mark as Paid
                    </Button>
                )}
                <UpdateAppointmentModal
                    appointment={appointment}
                    setAppointment={
                        setAppointment as unknown as React.Dispatch<
                            React.SetStateAction<AppointmentRecord>
                        >
                    }
                />
            </Box>
            <Divider />

            <Typography variant="body1">{appointment.description}</Typography>
        </Container>
    );
};

export default AppointmentDetails;
