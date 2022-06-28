import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  display: boolean = false;

  signupForm = this.fb.group({
    email: [''],
    password: [''],
    confirmPassword: ['']
  });

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.createUser(this.signupForm.value.email, this.signupForm.value.password).then((res)=>{
      console.log(`${res.user} : result of create user`)
    }).catch((err)=>{
      console.log("unable to create User: error "+ err)
    })
  }

  showDialog(){
    this.display = true;
  }

}
