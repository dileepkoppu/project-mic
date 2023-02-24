import { Component, OnInit } from '@angular/core';


import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  role!:boolean|null

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value =>{ 
      this.loggedIn = value
      console.log(value);
      
    });
    this.auth.behaviorRole.subscribe(value => this.role = value==="admin"||value==="superuser");
  }
  logout(){ 
    this.auth.logout()
  }
}
