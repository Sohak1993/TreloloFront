export class Project {
    id?: number;
    name: string;
    idUser: number;
    CreationDate?: Date;

    constructor(name: string, idUser: number, id?: number, CreationDate?: Date) {
        this.id = id;
        this.name = name;
        this.idUser = idUser;
        this.CreationDate = CreationDate;
    }
}