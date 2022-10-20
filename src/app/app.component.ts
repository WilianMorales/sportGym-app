import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase  from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sportGym-app';
  usuario!: firebase.User | null;
  cargando: boolean = true;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.createUserWithEmailAndPassword
    this.afAuth.user.subscribe((usuario)=>{

      this.cargando = false;
      this.usuario = usuario;
    });

  }

}
