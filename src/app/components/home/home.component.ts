import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status: Observable<any>;

  constructor(private auth: AuthService) { 
    this.status = this.auth.getStatus()
  }

  ngOnInit(): void {
    
  }

  

  toHome(){
    console.log("Navigating to Home")
  }

}
