import * as fs from "fs";
import { Transcript, Student, StudentID, Course, CourseGrade } from "./types";

const DATA_FILE = "./data.json";

export class TranscriptManager {
    private transcripts: Transcript[];

    constructor() {
        this.transcripts = this.loadData();
    }

    private loadData(): Transcript[] {
        if (!fs.existsSync(DATA_FILE)) {
            console.log("No data file found, starting with empty list...");
            return [];
        }
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(fileContent);
    }

    public debugPrint(): void {
        console.log(this.transcripts);
    }

    public initialize(): void {
        if (this.transcripts.length > 0) {
            console.log("Database already initialized, skipping...");
            return; // just exit, don't overwrite existing data
        }

        this.transcripts = [
            {
                student: { studentID: 230001, studentName: "Sherzod" },
                grades: []
            },
            {
                student: { studentID: 230002, studentName: "Laylo" },
                grades: []
            },
            {
                student: { studentID: 230003, studentName: "Olimjon" },
                grades: []
            },
            {
                student: { studentID: 230004, studentName: "Azamat" },
                grades: []
            }
        ];

        this.saveData();
        console.log("Database initialized with 4 students.");
    }

    private saveData(): void {
        const jsonData = JSON.stringify(this.transcripts, null, 2);
        fs.writeFileSync(DATA_FILE, jsonData, "utf-8");
    }

    public getAll(): Transcript[] {
        return this.transcripts;
    }

    public addStudent(name: string): number {
        const newID =
            this.transcripts.length > 0
                ? Math.max(...this.transcripts.map((t) => t.student.studentID)) + 1
                : 230000;

        const newStudent: Student = { studentID: newID, studentName: name };
        this.transcripts.push({ student: newStudent, grades: [] });

        this.saveData();
        return newID;
    }

    public getTranscript(studentID: number): Transcript | undefined {
        return this.transcripts.find(t => t.student.studentID === studentID);
    }

    public getStudentIDs(studentName: string): StudentID[] {
        return this.transcripts
            .filter(t => t.student.studentName === studentName)
            .map(t => t.student.studentID);
    }

    public deleteStudent(studentID: StudentID): void {
        const index = this.transcripts.findIndex(t => t.student.studentID === studentID);

        if (index === -1) {
            throw new Error(`No student found with ID ${studentID}`);
        }

        this.transcripts.splice(index, 1);
        this.saveData();
    }

    public addGrade(studentID: StudentID, course: Course, grade: number): void {
        const transcript = this.transcripts.find(t => t.student.studentID === studentID);

        if (!transcript) {
            throw new Error(`No student found with ID ${studentID}`);
        }

        const existingGrade = transcript.grades.find(g => g.course === course);
        if (existingGrade) {
            throw new Error(
                `Student with ID ${studentID} already has a grade for ${course}`
            );
        }

        transcript.grades.push({ course, grade });

        this.saveData();
    }

    public getGrade(studentID: StudentID, course: Course): number {
        const transcript = this.transcripts.find(t => t.student.studentID === studentID);

        if (!transcript) {
            throw new Error(`No student found with ID ${studentID}`);
        }

        const gradeEntry = transcript.grades.find(g => g.course === course);
        if (!gradeEntry) {
            throw new Error(
                `No grade found for course "${course}" for student with ID ${studentID}`
            );
        }

        return gradeEntry.grade;
    }


}
