import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";

import { SignUpComponent } from './navbar/sign-up/sign-up.component';
import { ProfileComponent } from './navbar/profile/profile.component';
import { SignInComponent } from "./navbar/sign-in/sign-in.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from "../../environments/environment";
import { provideAuth,getAuth } from '@angular/fire/auth';

import {PasswordModule} from 'primeng/password';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AuthTokenInterceptor} from "./interceptors/auth-token.interceptor";
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SignUpComponent,
    ProfileComponent,
    SignInComponent,
    PageNotFoundComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    PasswordModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
    exports: [
        NavbarComponent,
        ToastComponent,
    ]
})
export class CoreModule { }
