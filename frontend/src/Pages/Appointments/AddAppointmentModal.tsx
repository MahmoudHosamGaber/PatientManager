import { Box, Button, Modal, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ModalBox } from "../../Components/ModalStyles/ModalStyles";
import AddIcon from "@mui/icons-material/Add";
import axios, { AxiosError } from "axios";
import { useToast } from "../../Context/ToastContext";
import { useAuth } from "../../Context/AuthContext";
import { AppointmentRecord, PatientRecord } from "../../global";
import { Loader } from "../../Components";
import { translate } from "../../Utils/Translate";

type Props = {
    patient: PatientRecord;
    setAppointments: Dispatch<SetStateAction<AppointmentRecord[]>>;
};
const AddAppointmentModal = ({ patient, setAppointments }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    const token = user?.token;
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            e.preventDefault();
            const axiosOptions = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title");
            const date = formData.get("date");
            const description = formData.get("description");
            const patientId = patient._id;
            const cost = parseInt(formData.get("cost") as string);
            const paid = parseInt(formData.get("paid") as string);
            const response = await axios.post(
                "/api/appointment",
                {
                    title,
                    date,
                    description,
                    patient: patientId,
                    cost,
                    paid,
                },
                axiosOptions
            );
            setAppointments((prev) => [...prev, response.data]);
            handleClose();
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
    const timeZoneOffSetInMS = new Date().getTimezoneOffset() * 60 * 1000;
    const currentDate = new Date(new Date().getTime() - timeZoneOffSetInMS)
        .toISOString()
        .slice(0, 16);
    return (
        <>
            <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                variant="contained"
                color="success"
            >
                {translate("new appointment")}
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
                            gap: "1rem",
                        }}
                    >
                        <TextField
                            label={translate("title")}
                            name="title"
                            required
                        />
                        <TextField
                            label={translate("description")}
                            name="description"
                        />
                        <TextField
                            label={translate("date")}
                            name="date"
                            type="datetime-local"
                            defaultValue={currentDate}
                            required
                        />
                        <TextField
                            label={translate("cost")}
                            name="cost"
                            type="number"
                            required
                        />
                        <TextField
                            label={translate("paid")}
                            name="paid"
                            type="number"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={loading}
                        >
                            Add Appointment
                        </Button>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default AddAppointmentModal;
