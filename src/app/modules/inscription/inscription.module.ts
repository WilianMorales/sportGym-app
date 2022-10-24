import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionRoutingModule } from './inscription-routing.module';

import { AddInscriptionComponent } from './add-inscription/add-inscription.component';
import { SelectClientComponent } from 'src/app/components/select-client/select-client.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddInscriptionComponent,
    SelectClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
