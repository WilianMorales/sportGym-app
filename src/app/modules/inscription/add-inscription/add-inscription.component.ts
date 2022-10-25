import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Client } from 'src/app/models/client';
import { Inscription } from 'src/app/models/inscription';
import { Precio } from 'src/app/models/precio';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-inscription',
  templateUrl: './add-inscription.component.html',
  styleUrls: ['./add-inscription.component.scss']
})
export class AddInscriptionComponent implements OnInit {

  inscription: Inscription = new Inscription();
  selectedClient: Client = new Client();
  priceSelected?: Precio = new Precio();
  idPrice: string = '';
  prices: Precio[] = new Array<Precio>();
  constructor(private db: AngularFirestore, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cargarPrecio();
  }

  cargarPrecio(): void {
    this.spinner.show();
    this.db.collection<Precio>('precios').get().subscribe((result) => {
      result.docs.forEach((item) => {
        let precio = item.data();
        precio.id = item.id;
        precio.ref = item.ref;
        this.prices.push(precio);
        this.spinner.hide();
      })
    })
  }

  assignClient(cliente: Client) {
    this.inscription.client = cliente.ref;
    this.selectedClient = cliente;
  }

  deletedClient(): void {
    this.selectedClient = new Client();
    this.inscription.client = undefined;
  }

  guardar(): void {
    console.log(this.inscription);

  }

  priceSelect(event: any): void {
    let id: string = event.target.value;

    this.priceSelected = this.prices.find(x => x.id == id);
    this.inscription.prices = this.priceSelected?.ref;

    this.inscription.subTotal = this.priceSelected?.cost;
    this.inscription.igv = this.inscription.subTotal! * 0.18;
    this.inscription.total = this.inscription.subTotal! + this.inscription.igv;

    this.inscription.date = new Date();

    if (this.priceSelected?.typeDuration == 1) {
      let dias: number = this.priceSelected.duration;
      let fechaFinal = new Date(
        this.inscription.date.getFullYear(),
        this.inscription.date.getMonth(),
        this.inscription.date.getDate() + dias)
      this.inscription.finalDate = fechaFinal;
    }
    if (this.priceSelected?.typeDuration == 2) {
      let dias: number = this.priceSelected.duration * 7;
      let fechaFinal = new Date(
        this.inscription.date.getFullYear(),
        this.inscription.date.getMonth(),
        this.inscription.date.getDate() + dias)
      this.inscription.finalDate = fechaFinal;
    }
    if (this.priceSelected?.typeDuration == 3) {
      let dias: number = this.priceSelected.duration * 15;
      let fechaFinal = new Date(
        this.inscription.date.getFullYear(),
        this.inscription.date.getMonth(),
        this.inscription.date.getDate() + dias)
      this.inscription.finalDate = fechaFinal;
    }
    if (this.priceSelected?.typeDuration == 4) {
      let anio: number = this.inscription.date.getFullYear();
      let meses: number = this.priceSelected.duration + this.inscription.date.getMonth();
      let dia: number = this.inscription.date.getDate();
      let fechaFinal = new Date(anio, meses, dia)
      this.inscription.finalDate = fechaFinal;
    }
    if (this.priceSelected?.typeDuration == 5) {
      let anio: number = this.inscription.date.getFullYear() + this.priceSelected.duration;
      let meses: number = this.inscription.date.getMonth();
      let dia: number = this.inscription.date.getDate();
      let fechaFinal = new Date(anio, meses, dia)
      this.inscription.finalDate = fechaFinal;
    }
  }

}
