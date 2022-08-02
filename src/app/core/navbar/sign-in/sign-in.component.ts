import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  display: boolean = false;

  signinForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.signIn(this.signinForm.value.email, this.signinForm.value.password).then((res)=>{
      console.log(`${res.user.email} : result of sign in user`)
      res.user.getIdToken().then((res) => localStorage.setItem("authToken", res));
    }).catch((err)=>{
      this.toast.genericError("Error: Sign in failed.");
    })
    console.log("submitted");
  }

  showDialog(){
    this.display = true;
  }

}
