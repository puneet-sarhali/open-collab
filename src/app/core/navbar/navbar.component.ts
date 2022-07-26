import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {
  status: Observable<any>;
  constructor(private auth: AuthService, private messageService: MessageService) {
    this.status = this.auth.userInfo()
  }

  ngOnInit(): void {
    this.auth.unauthorized$.subscribe((value) => {
      if(value){
        this.displayError()
      }
    });
  }

  displayError(){
    this.messageService.add({severity:'error', summary:'Unauthorized', detail:'Please Sign In'});
  }

  onSignout(){
    this.auth.signout();
  }

}
