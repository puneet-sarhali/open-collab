import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.signIn(this.signinForm.value.email, this.signinForm.value.password).then((res)=>{
      console.log(`${res.user.email} : result of sign in user`)
    }).catch((err)=>{
      console.log("unable to sign in User: error "+ err)
    })
    console.log("submitted");
  }

  showDialog(){
    this.display = true;
  }

}
