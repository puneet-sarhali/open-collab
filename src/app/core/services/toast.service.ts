import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  projectCreated$ = new BehaviorSubject(false);
  projectDeleted$ = new BehaviorSubject(false);
  unauthorized$ = new BehaviorSubject(false);
  genericError$ = new BehaviorSubject("");
  genericSuccess$ = new BehaviorSubject(false);
  constructor() { }

  projectCreated(){
    this.projectCreated$.next(true);
  }
  projectDeleted(){
    this.projectDeleted$.next(true);
  }
  unAuthReq(){
    this.unauthorized$.next(true);
  }
  genericError(message: string){
    this.genericError$.next(message);
  }
  genericSuccess(){
    this.genericSuccess$.next(true);
  }
}
