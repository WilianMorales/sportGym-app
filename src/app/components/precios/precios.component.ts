import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';

import { NgxSpinnerService } from "ngx-spinner";
import { Precio } from 'src/app/models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formPrices!: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditable: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msg: MessagesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.formPrices = this.validateForm();
    this.mostrarPrecio();
  }

  validateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      duration: ['', Validators.required],
      typeDuration: [-1, Validators.pattern('^[0-9]*$')]
    })
  }

  isValidField(fiel: string): string {
    const validatedField = this.formPrices.get(fiel);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  onSubmit(): void {
    this.db.collection<Precio>('precios').add(this.formPrices.value).then(() => {
      this.msg.messageSuccess('Agregado', 'Se agrego correctamente');
      this.formPrices.reset();
      this.mostrarPrecio();
    })
  }

  mostrarPrecio(): void {
    this.spinner.show();
    this.precios.length = 0;
    this.db.collection<Precio>('precios').get().subscribe((result) => {
      result.docs.forEach((item) => {
        let precio = item.data();
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
        this.spinner.hide();
      });
    })
  }

  cargarFormPrecio(precio: Precio) {
    this.esEditable = true;
    this.formPrices.setValue({
      name: precio.name,
      cost: precio.cost,
      duration: precio.duration,
      typeDuration: precio.typeDuration
    });
    this.id = precio.id;
  }


  onUpdate(): void {
    this.db.doc('precios/' + this.id).update(this.formPrices.value).then(() => {
      this.msg.messageSuccess('Editado', 'Se edito correctamente.');
      this.formPrices.reset();
      this.esEditable = false;
      this.mostrarPrecio();
    }).catch(()=> {
      this.msg.messageError('Error', 'Ocurrio un error');
    });
  }

  cancelUpdated(): void {
    this.formPrices.reset();
    this.esEditable = false;
  }
}
