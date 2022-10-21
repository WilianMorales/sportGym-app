import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientComponent } from './list-client/list-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ListClientComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot()
  ],
  providers: [MessagesService]
})
export class ClientModule { }
