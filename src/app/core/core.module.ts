import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

import { SignUpComponent } from './navbar/sign-up/sign-up.component';
import { ProfileComponent } from './navbar/profile/profile.component';
import { SignInComponent } from "./navbar/sign-in/sign-in.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from "../../environments/environment";
import { provideAuth,getAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    NavbarComponent,
    SignUpComponent,
    ProfileComponent,
    SignInComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
