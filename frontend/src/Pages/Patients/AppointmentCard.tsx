import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppointmentRecord } from "../../global";
import {
    AppointmentActionArea,
    AppointmentContainer,
} from "../Appointments/AppointmentStyles";

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
        hour: "numeric",
        minute: "numeric",
    }).format(date);
    enum Status {
        Pending = "Pending",
        Completed = "Completed",
    }
    const status =
        appointment.paid < appointment.cost ? Status.Pending : Status.Completed;

    return (
        <Card onClick={() => navigate(`/appointments/${appointment._id}`)}>
            <AppointmentActionArea>
                <Typography fontSize="2rem">{appointment.title}</Typography>
                <Typography variant="h6">
                    Status:{" "}
                    <span
                        style={{
                            color: status === Status.Pending ? "red" : "green",
                        }}
                    >
                        {status}
                    </span>
                </Typography>

                <Typography variant="h5">{formattedDate}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {appointment.description.slice(0, 200)}
                    {appointment.description.length > 200 ? "..." : ""}
                </Typography>
            </AppointmentActionArea>
        </Card>
    );
};

export default AppointmentCard;
