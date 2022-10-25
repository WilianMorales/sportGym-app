import { DocumentReference } from "@angular/fire/compat/firestore";

export class Precio {
    id!: string;
    name!: string;
    cost?: number;
    duration!: number;
    typeDuration!: number;
    ref!: DocumentReference;
}
