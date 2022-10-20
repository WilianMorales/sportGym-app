import { Component, OnInit } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientes: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.listClientes();
  }

  listClientes(): void {
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
        this.db.doc<any>('clientes/' + id).delete();
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
