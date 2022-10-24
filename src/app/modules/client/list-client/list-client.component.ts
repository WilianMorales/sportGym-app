import { Component, OnInit } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientes: Client[] = new Array<Client>();

  constructor(private db: AngularFirestore, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.listClientes();
  }

  listClientes(): void {
    this.clientes.length = 0;
    this.spinner.show();
    this.db.collection<Client>('clientes').get().subscribe((res) => {
      res.docs.forEach((item) => {

        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;

        this.clientes.push(cliente);
        this.spinner.hide();
      })
    });
  }

  deleteClient(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.db.doc<Client>('clientes/' + id).delete();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ),
        this.listClientes();
      }
    })
  }
}
