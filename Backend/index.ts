import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/routes";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SECRET!,
    })
);

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api", router);

const port = process.env.PORT!;

mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log("\x1b[34m", "Connected to MongoDB");
    app.listen(port, () => {
        console.log("\x1b[37m", `Server listening on port ${port}`);
    });
});
