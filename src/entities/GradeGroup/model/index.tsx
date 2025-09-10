export class GradeGroup {
  id: string;
  subjectId: number;
  groupId: number;
  date: Date;

  constructor(id: string, subjectId: number, groupId: number, date: Date) {
    this.id = id;
    this.subjectId = subjectId;
    this.groupId = groupId;
    this.date = date;
  }
};