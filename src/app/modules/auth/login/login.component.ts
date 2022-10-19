import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  datosCorrectos: boolean = true;
  textError = '';
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private spinner: NgxSpinnerService) {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(6)
      ])],
    });
  }

  ngOnInit(): void {
  }

  ingresar(): void {
    if (this.formLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.afAuth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
        .then((usuario) => {
          console.log(usuario);
          this.spinner.hide();
        }).catch((err) => {
          this.datosCorrectos = false;
          this.textError = err.message;
          this.spinner.hide();
        });
    } else {
      this.datosCorrectos = false;
      this.textError = 'Por favor verifique que los datos esten correctos!'
    }
  }

}
