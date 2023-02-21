import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { ModalBox } from "../../Components/ModalStyles/ModalStyles";
import AddIcon from "@mui/icons-material/Add";

const AddPatientModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                variant="contained"
                color="success"
            >
                New Patient
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
                    >
                        <TextField
                            label="First Name"
                            name="firstName"
                            required
                        />
                        <TextField label="Last Name" name="lastName" required />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Add Patient
                        </Button>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default AddPatientModal;
