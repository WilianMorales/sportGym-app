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
  prices: Precio[] = new Array<Precio>();
  constructor(private db: AngularFirestore, private spinner: NgxSpinnerService ) { }

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

}
