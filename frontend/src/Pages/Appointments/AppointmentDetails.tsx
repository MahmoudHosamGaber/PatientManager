import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../Components";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { AppointmentRecord } from "../../global";

const AppointmentDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { toast } = useToast();
    const [appointment, setAppointment] = useState<AppointmentRecord>();
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
        if (!id) return;
        getAppointment(id);
    }, [id]);
    if (loading) return <Loader open={loading} />;
    return <div>AppointmentDetails</div>;
};

export default AppointmentDetails;
