# CS360 Assignment 1

## Description
This project is a mini transcript management system built with **TypeScript** and **Node.js**.  
It allows you to perform **CRUD operations** (Create, Read, Update, Delete) on student transcripts stored in a JSON file (`data.json`).

---

## Project Structure

cs360-assignment-1/ \n
├── data.json # Mini database storing student transcripts \n
├── .gitignore # Ignore unnecessary files for GitHub \n
├── package.json # Project metadata, dependencies, and scripts \n
├── tsconfig.json # TypeScript compilation settings \n
└── src/ \n
├── index.ts # Main entry point \n
└── TranscriptManager.ts # Module for managing transcripts \n


---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd cs360-assignment-1

Install dependencies:
npm install

Build TypeScript code:
npm run build

Run compiled JavaScript:
npm run start

Run TypeScript directly (development mode):
npm run dev

JSON Database Structure
data.json stores an array of student transcripts:

[
  {
    "student": { "studentID": 230055, "studentName": "Azamat" },
    "grades": [
      { "course": "Math", "grade": 95 },
      { "course": "Physics", "grade": 88 }
    ]
  }
]

Types 
export type StudentID = number;
export type Student = { studentID: number; studentName: string };
export type Course = string;
export type CourseGrade = { course: Course; grade: number };
export type Transcript = { student: Student; grades: CourseGrade[] };


Author
Azamat E. Zakirovich
