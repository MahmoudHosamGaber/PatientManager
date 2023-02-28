import { Box, Button, TextField } from "@mui/material";
import AddPatientModal from "./AddPatientModal";
import { PatientSearchForm } from "./PatientStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { PatientRecord } from "../../global";
import { useAuth } from "../../Context/AuthContext";

type Props = {
    setPatients: Dispatch<SetStateAction<PatientRecord[]>>;
};
const PatientSearch = ({ setPatients }: Props) => {
    const { user } = useAuth();
    const token = user?.token;
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name: string = (formData.get("name") as string).trim() || "";
        const phonenumber: string =
            (formData.get("phoneNumber") as string).trim() || "";
        const authorization = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            "/api/patient/filter",
            {
                name,
                phonenumber,
            },
            authorization
        );
        const patients: PatientRecord[] = response.data;
        setPatients(patients);
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
            }}
        >
            <AddPatientModal setPatients={setPatients} />
            <PatientSearchForm onSubmit={onSubmit}>
                <TextField label="Name" name="name" variant="standard" />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    variant="standard"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    startIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </PatientSearchForm>
        </Box>
    );
};

export default PatientSearch;
