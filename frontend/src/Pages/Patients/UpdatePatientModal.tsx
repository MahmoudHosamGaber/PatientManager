import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Loader } from "../../Components";
import { ModalBox } from "../../Components/ModalStyles/ModalStyles";
import { useAuth } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { PatientRecord } from "../../global";
import { translate } from "../../Utils/Translate";
type Props = {
    patient: PatientRecord;
    setPatient?: React.Dispatch<React.SetStateAction<PatientRecord>>;
    setPatients?: React.Dispatch<React.SetStateAction<PatientRecord[]>>;
};
const UpdatePatientModal = ({ patient, setPatients, setPatient }: Props) => {
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
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            const phonenumber = formData.get("phonenumber");
            const respose = await axios.put(
                `/api/patient/${patient._id}`,
                { firstName, lastName, phonenumber },
                config
            );
            if (setPatients) {
                setPatients((prev) =>
                    prev.map((p) => {
                        if (p._id === patient._id) {
                            return respose.data._doc;
                        }
                        return p;
                    })
                );
            }
            if (setPatient) setPatient(respose.data._doc);

            toast.success("Patient Updated Successfully");
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
                // size="small"
                color="warning"
                variant="contained"
            >
                {translate("update")}
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
                            label={translate("first name")}
                            name="firstName"
                            defaultValue={patient.firstName}
                        />
                        <TextField
                            label={translate("last name")}
                            name="lastName"
                            defaultValue={patient.lastName}
                        />
                        <TextField
                            label={translate("phone number")}
                            name="phonenumber"
                            defaultValue={patient.phonenumber}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="warning"
                        >
                            {translate("update patient")}
                        </Button>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default UpdatePatientModal;
