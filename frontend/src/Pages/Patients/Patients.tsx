import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "../../Context/ToastContext";
import { useAuth } from "../../Context/AuthContext";
import { PatientRecord } from "../../global";
import PatientCard from "./PatientCard";
import { Box, Container, Divider } from "@mui/material";
import { PatientContainer, PatientPage } from "./PatientStyles";
import PatientSearch from "./PatientSearch";
const Patients = () => {
    const [patients, setPatients] = useState<PatientRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const { user } = useAuth();
    const getAllPatients = async () => {
        try {
            const authorization = {
                headers: {
                    authorization: `Bearer ${user?.token}`,
                },
            };
            const res = await axios.get("/api/patient", authorization);
            setPatients(res.data);
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

    useEffect(() => {
        getAllPatients();
    }, []);

    return (
        <PatientPage>
            <PatientSearch setPatients={setPatients} />
            <Divider />
            <PatientContainer>
                {patients.map((patient) => {
                    return <PatientCard patient={patient} key={patient._id} />;
                })}
            </PatientContainer>
        </PatientPage>
    );
};

export default Patients;
