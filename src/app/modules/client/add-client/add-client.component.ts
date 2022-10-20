import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  formClient!: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  porcentajeSubida: number = 0;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formClient = this.initForm();
  }

  onSubmit(): void {
    console.log(this.formClient.value);
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

  isValidField(field: string): string {
    const validatedField = this.formClient.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  notRequiredHasValue(field: string): string {
    return this.formClient.get(field)?.value ? 'is-valid' : '';
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
          ref.getDownloadURL().subscribe((url) =>{
            console.log(url);
          })
        })
        task.percentageChanges().subscribe((porcentaje: any)=> {
          this.porcentajeSubida = parseInt(porcentaje.toString());
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
