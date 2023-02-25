import { Typography, Container, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../Components";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { AppointmentRecord, PatientRecord } from "../../global";
import { AppointmentContainer } from "../Appointments/AppointmentStyles";
import AppointmentCard from "./AppointmentCard";
import PhoneIcon from "@mui/icons-material/Phone";
import UpdatePatientModal from "./UpdatePatientModal";
import AddAppointmentModal from "../Appointments/AddAppointmentModal";

const PatientDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { toast } = useToast();
    const [patient, setPatient] = useState<PatientRecord>();
    const [appointments, setAppointments] = useState<AppointmentRecord[]>();
    const authorization = {
        headers: {
            authorization: `Bearer ${user?.token}`,
        },
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

    const getAppointments = async (id: string) => {
        try {
            const res = await axios.get<AppointmentRecord[]>(
                `/api/appointment/patient/${id}`,
                authorization
            );

            setAppointments(
                res.data.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                )
            );
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
        getPatient(id);
        getAppointments(id);
    }, [id]);

    if (!patient || !appointments) return <Loader open={true} />;

    const firstName =
        patient?.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1);
    const lastName =
        patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1);
    const fullName = firstName + " " + lastName;
    return (
        <Container
            sx={{
                paddingBlock: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3" fontWeight="bold" textAlign="center">
                    {fullName}
                </Typography>
                <Typography textAlign="center" variant="h5">
                    <PhoneIcon fontSize="small" /> {patient.phonenumber}
                </Typography>
                <UpdatePatientModal
                    patient={patient}
                    setPatient={
                        setPatient as Dispatch<SetStateAction<PatientRecord>>
                    }
                />
            </Box>
            <Box>
                <AddAppointmentModal
                    patient={patient}
                    setAppointments={
                        setAppointments as Dispatch<
                            SetStateAction<AppointmentRecord[]>
                        >
                    }
                />
            </Box>
            <AppointmentContainer>
                {appointments.map((appointment) => {
                    return <AppointmentCard appointment={appointment} />;
                })}
            </AppointmentContainer>
        </Container>
    );
};

export default PatientDetails;
