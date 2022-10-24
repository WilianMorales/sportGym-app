import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreciosComponent } from './components/precios/precios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inscription',
    pathMatch: 'full'
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./modules/inscription/inscription.module').then((m) => m.InscriptionModule)
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'precios',
    component: PreciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
