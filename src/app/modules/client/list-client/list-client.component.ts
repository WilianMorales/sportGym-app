import { Component, OnInit } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientes: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    /* this.db.collection('clientes').valueChanges().subscribe((res) => {
      this.clientes = res;
    }); */
    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((res) => {

      res.docs.forEach((item) => {

        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;

        this.clientes.push(cliente);
      })
    });
  }

}
