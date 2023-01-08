import { Task } from "../Task/task-model";

export class FullList {
    id: number;
    name: string;
    idProject: number;
    deadLine: Date;
    creationDate: Date;
    tasks?: Task[];

    constructor(id: number, name: string, idProject: number, deadLine: Date, creationDate: Date, tasks: Task[]) {
        this.id = id;
        this.name = name;
        this.idProject = idProject;
        this.deadLine = deadLine;
        this.creationDate = creationDate;
        this.tasks = tasks;
    }
}