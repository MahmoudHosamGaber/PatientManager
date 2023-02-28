import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("changePassword");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <Tabs value={tab} onChange={handleChange}>
            <Tab
                label="Change Password"
                value="changePassword"
                onClick={() => navigate("/change-password")}
            />
        </Tabs>
    );
};

export default Profile;
