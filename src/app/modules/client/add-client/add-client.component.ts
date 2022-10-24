import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { NgxSpinnerService } from "ngx-spinner";

import { Location } from '@angular/common';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  formClient!: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  uploadPercent: number = 0;
  urlImagen?: string = '';
  esEditable: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRouter: ActivatedRoute,
    private msg: MessagesService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formClient = this.initForm();
    this.cargarForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      dni: [''],
      fechaNacimiento: ['', Validators.required],
      phone: [''],
      imgUrl: ['', Validators.required]
    });
  }

  cargarForm() {
    this.id = this.activeRouter.snapshot.params.clienteID;
    if (this.id != undefined) {
      this.esEditable = true;
      this.spinner.show();
      this.db.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe((cliente) => {
        this.formClient.setValue({
          name: cliente.name,
          lastName: cliente.lastName,
          email: cliente.email,
          dni: cliente.dni,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().slice(0, 10),
          phone: cliente.phone,
          imgUrl: ''
        })
        this.urlImagen = cliente.imgUrl
        this.spinner.hide();
      });
    }
  }

  isValidField(field: string): string {
    const validatedField = this.formClient.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  notRequiredHasValue(field: string): string {
    return this.formClient.get(field)?.value ? 'is-valid' : '';
  }

  onSubmit(): void {
    this.formClient.value.imgUrl = this.urlImagen;
    this.formClient.value.fechaNacimiento = new Date(this.formClient.value.fechaNacimiento);
    this.db.collection<any>('clientes').add(this.formClient.value).then(() => {
      this.msg.messageSuccess(`Cliente ${this.formClient.value.name}`, 'Se agrego correctamente');
      this.formClient.reset();
      this.uploadPercent = 0;
    }).catch(() => {
      this.msg.messageError('Error', 'Ocurrio algun error');
    })

  }

  updateClient(): void {
    if (this.urlImagen == undefined) {
      console.log('debe cargar una imagen');
    } else {
      this.formClient.value.imgUrl = this.urlImagen;
      this.formClient.value.fechaNacimiento = new Date(this.formClient.value.fechaNacimiento);
      this.db.doc<any>('clientes/' + this.id).update(this.formClient.value).then(() => {
        this.msg.messageSuccess(`Cliente ${this.formClient.value.name}`, 'Se actualizo los datos correctamente');
        this.router.navigate(['clientes']);
      }).catch(() => {
        this.msg.messageError('Error', 'Ocurrio algun error');
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  //file type validation
  uploadFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let name = new Date().getTime().toString();
      let file = event.target.files[0];
      if (file.type == "image/png" || file.type == "image/jpeg") {
        let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
        let ruta = 'clientes/' + name + extension;
        const ref = this.storage.ref(ruta);
        const task = ref.put(file);
        task.then((obj) => {
          console.log('imagen subida');
          ref.getDownloadURL().subscribe((url) => {
            this.urlImagen = url;
          })
        })
        task.percentageChanges().subscribe((porcentaje: any) => {
          this.uploadPercent = parseInt(porcentaje.toString());
        })
      }
      else {
        //call validation
        this.formClient.reset();
        this.formClient.controls["imgUrl"].setValidators([Validators.required]);
        this.formClient.get('imgUrl')?.updateValueAndValidity();
      }
    }
  }

}
