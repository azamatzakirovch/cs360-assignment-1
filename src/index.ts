import express, { Request, Response } from "express";
import { TranscriptManager } from "./TranscriptManager";

const app = express();
const port = 3000;

app.use(express.json());

const manager = new TranscriptManager();

app.post("/initialize", (req: Request, res: Response) => {
    manager.initialize();
    res.json({ message: "Database initialized with default students" });
});

app.get("/students", (req: Request, res: Response) => {
    res.json(manager.getAll());
});

app.post("/students", (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const id = manager.addStudent(name);
    res.json({ message: "Student added", studentID: id });
});

app.delete("/students/:id", (req: Request, res: Response) => {
    const studentID = parseInt(req.params.id);
    try {
        manager.deleteStudent(studentID);
        res.json({ message: `Student ${studentID} deleted` });
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Transcript API running on http://localhost:${port}`);
});