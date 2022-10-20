import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, */
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule)
  }/* ,
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
