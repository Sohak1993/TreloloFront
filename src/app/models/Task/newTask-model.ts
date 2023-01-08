export class newTask {
    name: string;
    idList: number;
    deadLine: Date;

    constructor(name: string, idList: number, deadLine: Date) {
        this.name = name;
        this.idList = idList;
        this.deadLine = deadLine;
    }
}