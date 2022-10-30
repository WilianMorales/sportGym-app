import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inscription } from 'src/app/models/inscription';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss']
})
export class ListInscriptionComponent implements OnInit {

  inscripciones: any[] = [];
  constructor(private db: AngularFirestore, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.mostrarListado();
  }

  mostrarListado(): void{
    this.inscripciones.length = 0;
    this.spinner.show();
    this.db.collection<any>('inscripcion').get().subscribe((result) => {
      result.forEach((inscription) => {
        let inscripcionObtenida = inscription.data();
        inscripcionObtenida.id = inscription.id;

        this.db.doc(inscription.data().client.path).get().subscribe((cliente) => {
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.date = new Date(inscripcionObtenida.date.seconds * 1000);
          inscripcionObtenida.finalDate = new Date(inscripcionObtenida.finalDate.seconds * 1000);
          this.inscripciones.push(inscripcionObtenida);
        })
        this.spinner.hide();
      })
    })
  }

}
