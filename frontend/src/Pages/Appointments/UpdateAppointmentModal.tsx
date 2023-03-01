import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Loader } from "../../Components";
import { ModalBox } from "../../Components/ModalStyles/ModalStyles";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { AppointmentRecord } from "../../global";
import { translate } from "../../Utils/Translate";

type Props = {
    appointment: AppointmentRecord;
    setAppointment: React.Dispatch<React.SetStateAction<AppointmentRecord>>;
};
const UpdateAppointmentModal = ({ appointment, setAppointment }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const token = user?.token;
    const { toast } = useToast();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            e.preventDefault();
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title");
            const description = formData.get("description");
            const date = formData.get("date");
            const cost = parseInt(formData.get("cost") as string);
            const paid = parseInt(formData.get("paid") as string);
            const response = await axios.put(
                `/api/appointment/${appointment._id}`,
                {
                    title,
                    description,
                    date,
                    cost,
                    paid,
                },
                config
            );
            setAppointment(response.data);
            handleClose();
            toast.success("Appointment updated successfully");
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
    if (loading) return <Loader open={loading} />;
    const currentDate = new Date(
        new Date(appointment.date).getTime() -
            new Date().getTimezoneOffset() * 60000
    )
        .toISOString()
        .slice(0, 16);
    return (
        <>
            <Button onClick={handleOpen} color="warning" variant="contained">
                {translate("update appointment")}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                    >
                        <TextField
                            label={translate("title")}
                            name="title"
                            defaultValue={appointment.title}
                        />
                        <TextField
                            label={translate("description")}
                            name="description"
                            defaultValue={appointment.description}
                        />
                        <TextField
                            label={translate("date")}
                            name="date"
                            type="datetime-local"
                            defaultValue={currentDate}
                        />
                        <TextField
                            label={translate("cost")}
                            name="cost"
                            type="number"
                            defaultValue={appointment.cost}
                        />
                        <TextField
                            label={translate("paid")}
                            name="paid"
                            type="number"
                            defaultValue={appointment.paid}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="warning"
                        >
                            {translate("update appointment")}
                        </Button>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default UpdateAppointmentModal;
