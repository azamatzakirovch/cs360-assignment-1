import * as fs from "fs";
import {Transcript, Course, CourseGrade, StudentID, Student} from "./types";

const database = "./data.json";

export class TranscriptManager {
    //@ts-ignore
    private transcripts: Transcript[];

    constructor(){}

    private loadData(): Transcript[] {

        if(!fs.existsSync(database)){
            console.log("The database does not exist");
            return [];
        }

        const data = fs.readFileSync(database, "utf-8");

        return JSON.parse(data);
    }

    public initialize(): void{}

    private saveData():void{}

    public getAll(): Transcript[]{
        return []
    }

    public addStudent(name: string):void{}

    public deleteStudent(studentID:string):void{}

    public addGrade(studentID: StudentID, course: Course, grade : number):void{}

    public getGrade(studentId: StudentID, course: Course):number{
        return 1
    }
}