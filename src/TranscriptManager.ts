import * as fs from "fs";
import {Transcript, Course, CourseGrade, StudentID, Student} from "./types";

const database = "./data.json";

export class TranscriptManager {

    private transcripts: Transcript[];

    constructor(){
        this.transcripts = this.loadData();
    }

    private loadData(): Transcript[] {

        if(!fs.existsSync(database)){
            console.log("The database does not exist");
            return [];
        }

        const data = fs.readFileSync(database, "utf-8");

        return JSON.parse(data);
    }

    public initialize(): void{
        if(this.transcripts.length > 0){
            console.log("Initializing Transcript");
        }

        this.transcripts = [
            {
                student:{studentID:230001, studentName: "Sherzod"},
                grades: []
            },
            {
                student:{studentID:230002, studentName: "Olimjon"},
                grades: []
            },
            {
                student:{studentID:230003, studentName: "Leyla"},
                grades: []
            },
            {
                student:{studentID:230004, studentName: "Umarjon"},
                grades: []
            }
        ]
        this.saveData()
        console.log("The Database initialized with 4 students");
    }

    private saveData():void{
        const jsonData = JSON.stringify(this.transcripts, null);
        fs.writeFileSync(database, jsonData,"utf-8");
    }

    public getAll(): Transcript[]{
        return this.transcripts;
    }

    public addStudent(name: string):number{
        const newID =
            this.transcripts.length > 0 ? Math.max(...this.transcripts.map((t) => t.student.studentID)) + 1:230001;

        const newStudent: Student = {studentID: newID, studentName: name};
        this.transcripts.push({student:newStudent, grades: []});
        this.saveData();
        return newID;
    }

    public deleteStudent(studentID:string):void{

    }

    public addGrade(studentID: StudentID, course: Course, grade : number):void{}

    public getGrade(studentId: StudentID, course: Course):number{
        return 1
    }
}