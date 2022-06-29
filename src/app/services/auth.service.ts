import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  createUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signout(){
    return signOut(this.auth)
  }

  getStatus(){
    return authState(this.auth);
  }
}
