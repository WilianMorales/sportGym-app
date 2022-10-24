import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AddInscriptionComponent } from './add-inscription/add-inscription.component';

const routes: Routes = [
  {
    path: '',
    component: AddInscriptionComponent
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InscriptionRoutingModule { }
  