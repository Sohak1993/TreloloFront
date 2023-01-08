export class Task {
    id: number;
    name: string;
    idList: number;
    deadLine: Date;
    creationDate: Date;

    constructor(id: number, name: string, idList: number, deadLine: Date, creationDate: Date) {
        this.id = id;
        this.name = name;
        this.idList = idList;
        this.deadLine = deadLine;
        this.creationDate = creationDate;
    }
}