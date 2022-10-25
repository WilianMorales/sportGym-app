import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss']
})
export class SelectClientComponent implements OnInit {

  clientes: Client[] = new Array<Client>();

  @Input('nombre') nombre?: string;
  @Output('selectedClient') selectedClient = new EventEmitter();
  @Output('canceledClient') canceledClient = new EventEmitter();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.initClientCollection();
  }

  initClientCollection(): void {
    this.db.collection<Client>('clientes').get().subscribe((result) => {
      this.clientes.length = 0;
      result.docs.forEach((item) => {
        let cliente: Client = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })
  }

  searchClient(event: any) {
    let nombreBuscar: string = event.target.value;
    this.clientes.forEach((client) => {
      if (client.name.toLowerCase().includes(nombreBuscar.toLowerCase())) {
        client.visible = true;
      } else {
        client.visible = false;
      }
    })
  }

  selectClient(cliente: Client) {
    this.nombre = cliente.name + ' ' + cliente.lastName;
    this.clientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.selectedClient.emit(cliente);
  }

  cancelSearch(): void {
    this.nombre = '';
    this.canceledClient.emit();
  }

}
