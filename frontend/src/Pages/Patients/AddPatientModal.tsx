import { Box, Button, Modal, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ModalBox } from "../../Components/ModalStyles/ModalStyles";
import AddIcon from "@mui/icons-material/Add";
import axios, { AxiosError } from "axios";
import { useToast } from "../../Context/ToastContext";
import { useAuth } from "../../Context/AuthContext";
import { PatientRecord } from "../../global";
import { Loader } from "../../Components";
import { translate } from "../../Utils/Translate";
type Props = {
    setPatients: Dispatch<SetStateAction<PatientRecord[]>>;
};
const AddPatientModal = ({ setPatients }: Props) => {
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
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData(e.currentTarget);
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            const phonenumber = formData.get("phonenumber");
            const respose = await axios.post(
                "/api/patient",
                { firstName, lastName, phonenumber },
                config
            );
            setPatients((prev) => [...prev, respose.data]);
            toast.success("Patient Added Successfully");
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
    if (loading) return <Loader open={loading} />;
    return (
        <>
            <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                variant="contained"
                color="success"
            >
                {translate("new patient")}
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
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                        onSubmit={onSubmit}
                    >
                        <TextField
                            label={translate("first name")}
                            name="firstName"
                            required
                        />
                        <TextField
                            label={translate("last name")}
                            name="lastName"
                            required
                        />
                        <TextField
                            label={translate("phone number")}
                            name="phonenumber"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            {translate("add patient")}
                        </Button>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default AddPatientModal;
