import { Box, Divider, Tab, Tabs } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { Loader } from "../../Components";
import AppointmentCard from "./AppointmentCard";
import { AppointmentRecord, PatientRecord } from "../../global";
import { AppointmentContainer, AppointmentPage } from "./AppointmentStyles";

const Appointments = () => {
    const [tab, setTab] = useState("all");
    const [appointments, setAppointments] = useState([]);
    const [unpaidAppointments, setUnpaidAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    const token = user?.token;
    const axiosOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const getAppointments = async () => {
        try {
            setLoading(true);
            const [
                appointmentResponse,
                unpaidAppointmentResponse,
                patientsResponse,
            ] = await Promise.all([
                axios.get("/api/appointment", axiosOptions),
                axios.get("/api/appointment/pending", axiosOptions),
                axios.get("/api/patient", axiosOptions),
            ]);
            setAppointments(appointmentResponse.data);
            setUnpaidAppointments(unpaidAppointmentResponse.data);
            setPatients(patientsResponse.data);
            setLoading(false);
        } catch (error: AxiosError | any) {
            const message =
                error.response?.data?.message || "Something went wrong";
            toast.error(message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAppointments();
    }, []);
    if (loading) return <Loader open={loading} />;
    const patientMap: {
        [key: string]: string;
    } = patients.reduce((acc, patient: PatientRecord) => {
        const firstName =
            patient.firstName.charAt(0).toUpperCase() +
            patient.firstName.slice(1);
        const lastName =
            patient.lastName.charAt(0).toUpperCase() +
            patient.lastName.slice(1);
        const fullName = firstName + " " + lastName;
        return {
            ...acc,
            [patient._id]: fullName,
        };
    }, {});
    let appointmentList: AppointmentRecord[] =
        tab === "all" ? appointments : unpaidAppointments;
    appointmentList = appointmentList.map((appointment: AppointmentRecord) => ({
        ...appointment,
        patient: patientMap[appointment.patient],
    }));
    appointmentList.sort(
        (a: AppointmentRecord, b: AppointmentRecord) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <AppointmentPage>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                <Tab label="All Appointments" value="all" />
                <Tab label="Unpaid Appointments" value="unpaid" />
            </Tabs>
            <AppointmentContainer>
                {appointmentList.map((appointment: AppointmentRecord) => (
                    <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                    />
                ))}
            </AppointmentContainer>
        </AppointmentPage>
    );
};

export default Appointments;
