import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'cw-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   public model: any = { email: 'admin@demo.com', password: 'demo' };

   constructor() { }

   ngOnInit() {
   }

}
