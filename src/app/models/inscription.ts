import { DocumentReference } from "@angular/fire/compat/firestore";

export class Inscription {
    date?: Date;
    finalDate?: Date;
    client?: DocumentReference
    prices?: DocumentReference;
    subTotal?: number;
    igv?: number;
    total?: number;

    constructor() {
        this.date = this.date;
        this.finalDate = this.finalDate;
        this.client = this.client;
        this.prices = this.prices;
        this.subTotal = this.subTotal;
        this.igv = this.igv;
        this.total = this.total;
    }

    validar(): any {
        let respuesta = {
            esValido: false,
            message: ''
        }

        if(this.client == null || this.client == undefined) {
            respuesta.esValido = false;
            respuesta.message = 'Porfavor seleccione un cliente';
            return respuesta;
        }

        if(this.prices == null || this.prices == undefined) {
            respuesta.esValido = false;
            respuesta.message = 'Porfavor seleccione un precio';
            return respuesta;
        }

        if(this.date == null || this.date == undefined) {
            respuesta.esValido = false;
            respuesta.message = 'No tiene fecha de inicio';
            return respuesta;
        }

        if(this.finalDate == null || this.finalDate == undefined) {
            respuesta.esValido = false;
            respuesta.message = 'No tiene fecha de final';
            return respuesta;
        }

        respuesta.esValido = true;
        return respuesta
    }
}
