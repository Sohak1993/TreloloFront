export class User {
    id: number;
    email: string;
    creationDate: Date;

    constructor(id: number, email: string, creationDate: Date) {
        this.id = id;
        this.email = email;
        this.creationDate = creationDate;
    }
}