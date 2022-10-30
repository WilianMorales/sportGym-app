import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AddInscriptionComponent } from './add-inscription/add-inscription.component';
import { ListInscriptionComponent } from './list-inscription/list-inscription.component';

const routes: Routes = [
  {
    path: '',
    component: AddInscriptionComponent
  },
  {
    path: 'list-inscription',
    component: ListInscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
