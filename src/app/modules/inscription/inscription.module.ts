import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionRoutingModule } from './inscription-routing.module';

import { AddInscriptionComponent } from './add-inscription/add-inscription.component';
import { SelectClientComponent } from 'src/app/components/select-client/select-client.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListInscriptionComponent } from './list-inscription/list-inscription.component';

@NgModule({
  declarations: [
    AddInscriptionComponent,
    SelectClientComponent,
    ListInscriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
