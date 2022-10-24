import { DocumentReference } from "@angular/fire/compat/firestore";

export class Client {
    id!: string;
    name!: string;
    lastName!: string;
    email!: string;
    fechaNacimiento!: Date;
    imgUrl!: string;
    phone!: string;
    dni!: number;
    ref!: DocumentReference;
    visible?: boolean;

    constructor() {
    }
}
