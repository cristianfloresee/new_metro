import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../../core/authentication/services/session.service';

@Component({
  selector: 'cw-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  constructor(private sessionSrv: SessionService) { }

  ngOnInit() {
  }

  logout(){
     console.log("logout...");
     this.sessionSrv.logout();
  }
}
