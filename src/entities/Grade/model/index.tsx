export class Grade {
  id: string;
  subjectId: number;
  studentId: number;
  date: Date;
  grade: number;

  constructor(id: string, subjectId: number, studentId: number, date: Date, grade: number) {
    this.id = id;
    this.subjectId = subjectId;
    this.studentId = studentId;
    this.date = date;
    this.grade = grade;
  }
} 