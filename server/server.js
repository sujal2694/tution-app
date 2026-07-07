import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import { userRouter } from './routes/userRoute.js';
import { studentRouter } from './routes/studentRoute.js';
import { routineRouter } from './routes/routineRoutes.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB().catch((error) => {
    console.error("Failed to initialize database connection:", error.message);
});

app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/routine", routineRouter)


app.get("/", (req, res) => {
    res.send("Api working");
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})