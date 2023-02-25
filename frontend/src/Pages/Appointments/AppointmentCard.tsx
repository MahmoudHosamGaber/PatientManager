import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { AppointmentRecord } from "../../global";
import { AppointmentActionArea } from "./AppointmentStyles";

type Props = {
    appointment: AppointmentRecord;
};
const AppointmentCard = ({ appointment }: Props) => {
    const date = new Date(appointment.date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(date);
    enum Status {
        Pending = "Pending",
        Completed = "Completed",
    }
    const status =
        appointment.paid < appointment.cost ? Status.Pending : Status.Completed;
    return (
        <Card>
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
                <Typography variant="h5">{appointment.patient}</Typography>
                <Typography variant="h6">{formattedDate}</Typography>
            </AppointmentActionArea>
        </Card>
    );
};

export default AppointmentCard;
