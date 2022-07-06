import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {UserService} from "../../http/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  display: boolean = false;

  signupForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.createUser(this.signupForm.value.email, this.signupForm.value.password).then((res)=>{
        this.auth.addName(this.signupForm.value.name)!.then( () => {
          this.userService.createUser({
            "id": res.user.uid,
            "email": res.user.email,
            "name": res.user.displayName
          }).subscribe((res) => console.log(res))
        })
    }).catch((err)=>{
      console.log("unable to create User: error "+ err)
    })
  }

  showDialog(){
    this.display = true;
  }

}
