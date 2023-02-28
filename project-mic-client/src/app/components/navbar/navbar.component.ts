import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  // public role:Boolean =false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value =>{ this.loggedIn = value});
    // this.auth.behaviorRole.subscribe(value => this.role = value);
  }
  logout(){ 
    this.auth.logout()
  }
}
