import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _uid!: string | null;
  _state!: boolean;
  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) =>{
      console.log("auth state changed");
      if(user){
        this._uid = user.uid;
        this._state = true;
      }else{
        this._state = false;
        this._uid = null;
      }
    })
  }

  createUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signout(){
    return signOut(this.auth)
  }


  get uid(){
    return this.auth.currentUser?.uid;
  }

  userInfo(){
    return authState(this.auth);
  }

  addName(name: string){
      return updateProfile(this.auth.currentUser!, {displayName: name});
  }

}
