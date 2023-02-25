import { Typography, Container, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../Components";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { AppointmentRecord, PatientRecord } from "../../global";
import AppointmentCard from "./AppointmentCard";

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
            <Box>
                <Typography variant="h3" fontWeight="bold" textAlign="center">
                    {fullName}
                </Typography>
                <Typography textAlign="center" variant="h5">
                    Phone Number: {patient.phonenumber}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit, 20rem)",
                }}
            >
                {appointments.map((appointment) => {
                    return <AppointmentCard appointment={appointment} />;
                })}
            </Box>
        </Container>
    );
};

export default PatientDetails;
