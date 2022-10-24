import { DocumentReference } from "@angular/fire/compat/firestore";

export class Inscription {
    date!: Date;
    finalDate!: Date;
    client?: DocumentReference
    prices?: DocumentReference;
    subTotal!: number;
    igv!: number;
    total!: number;

    constructor() {
        this.date = this.date;
        this.finalDate = this.finalDate;
        this.client = this.client;
        this.prices = this.prices;
        this.subTotal = this.subTotal;
        this.igv = this.igv;
        this.total = this.total;
    }
}
