import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { AppointmentRecord } from "../../global";

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
            <CardActionArea
                sx={{
                    padding: "1rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h4">{appointment.title}</Typography>
                    <Typography variant="h6">
                        Status:{" "}
                        <span
                            style={{
                                color:
                                    status === Status.Pending ? "red" : "green",
                            }}
                        >
                            {status}
                        </span>
                    </Typography>
                </Box>
                <Typography variant="h5">{formattedDate}</Typography>

                <Typography variant="body2" color="text.secondary">
                    {appointment.description.slice(0, 200)}
                    {appointment.description.length > 200 ? "..." : ""}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default AppointmentCard;
