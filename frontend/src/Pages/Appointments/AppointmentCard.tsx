import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppointmentRecord } from "../../global";
import { translate } from "../../Utils/Translate";
import { AppointmentActionArea } from "./AppointmentStyles";

type Props = {
    appointment: AppointmentRecord;
};
const AppointmentCard = ({ appointment }: Props) => {
    const navigate = useNavigate();
    const date = new Date(appointment.date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(date);
    enum Status {
        Pending = translate("unpaid"),
        Completed = translate("paid"),
    }
    const status =
        appointment.paid < appointment.cost ? Status.Pending : Status.Completed;
    return (
        <Card onClick={() => navigate(`/appointments/${appointment._id}`)}>
            <AppointmentActionArea>
                <Typography fontSize="2rem">{appointment.title}</Typography>
                <Typography variant="h6">
                    {translate("status")}:{" "}
                    <span
                        style={{
                            color: status === Status.Pending ? "red" : "green",
                        }}
                    >
                        {status}
                    </span>
                </Typography>
                <Typography variant="h5">{appointment.patient}</Typography>
                <Typography variant="h6">{formattedDate}</Typography>
            </AppointmentActionArea>
        </Card>
    );
};

export default AppointmentCard;
