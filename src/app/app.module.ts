import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LoginComponent } from './modules/auth/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [ AngularFireAuth ],
  bootstrap: [AppComponent]
})
export class AppModule { }
