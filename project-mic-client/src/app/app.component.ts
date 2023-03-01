import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-mic-client';
  isShow: boolean = true;
  name: any;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        console.log(event.constructor.name,(<any>event).url.split("/").slice(-1));
        this.name = (<any>event).url.split("/").slice(-1)[0];
        if (this.name=='login'||this.name=='question') {
          this.isShow=false
        }else{
          this.isShow=true
        }
      }
  })
  }


}
