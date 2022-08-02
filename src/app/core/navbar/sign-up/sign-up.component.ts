import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {UserService} from "../../http/user.service";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  display: boolean = false;

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
              private auth: AuthService, 
              private userService: UserService,
              private toast: ToastService) { }

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
      this.toast.genericError("Unable to sign up, try again.")
    })
  }

  showDialog(){
    this.display = true;
  }

}
