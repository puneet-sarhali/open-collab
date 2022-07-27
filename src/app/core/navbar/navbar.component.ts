import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  status: Observable<any>;
  constructor(private auth: AuthService) {
    this.status = this.auth.userInfo()
  }

  ngOnInit(): void {

  }



  onSignout(){
    this.auth.signout();
  }

}
