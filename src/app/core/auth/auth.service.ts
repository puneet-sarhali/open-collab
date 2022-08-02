import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState, signOut } from '@angular/fire/auth';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _uid!: string | null;
  isLoggedIn$ = new BehaviorSubject(false);
  isAdmin$ = new BehaviorSubject(false);
  userId$ = new BehaviorSubject("");

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) =>{
      user?.getIdToken().then((res) => localStorage.setItem("authToken", res));
      if(user){
        this.userId$.next(user.uid);
        this._uid = user.uid;
        this.isLoggedIn$.next(true);
        this.getUserClaims()?.then(res => {
          if(res.claims['admin']){
            this.isAdmin$.next(true);
          }
        })
      }else{
        this._uid = null;
      }
    })

  }

  getUserClaims(){
    return this.auth.currentUser?.getIdTokenResult();
  }

  createUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signout(){
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);
    return signOut(this.auth)
  }


  get uid(){
    return this.auth.currentUser?.uid;
  }

  get name(){
    return this.auth.currentUser?.displayName;
  }

  userInfo(){
    return authState(this.auth);
  }

  addName(name: string){
      return updateProfile(this.auth.currentUser!, {displayName: name});
  }

}
