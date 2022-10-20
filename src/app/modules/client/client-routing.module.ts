import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
    {
      path: '',
      component: ListClientComponent
    },
    {
      path: 'nuevo-cliente',
      component: AddClientComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }
  