export class NewList {
    name: string;
    idProject: number;
    deadLine: Date;

    constructor(name: string, idProject: number, deadLine: Date) {
        this.name = name;
        this.idProject = idProject;
        this.deadLine = deadLine;
    }
}
