export class List {
    id: number;
    name: string;
    idProject: number;
    deadLine: Date;
    creationDate: Date;

    constructor(id: number, name: string, idProject: number, deadLine: Date, creationDate: Date) {
        this.id = id;
        this.name = name;
        this.idProject = idProject;
        this.deadLine = deadLine;
        this.creationDate = creationDate;
    }
}