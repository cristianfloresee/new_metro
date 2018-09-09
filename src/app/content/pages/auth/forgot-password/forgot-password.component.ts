import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
   selector: 'cw-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

   @Input() action: string;
   @Output() actionChange = new Subject<string>();

   model: any = { email: '' };

   constructor() { }

   ngOnInit() {
   }


   //REEDIRECCIONA A LA PÁGINA LOGIN PAGE
   loginPage() {
      this.action = 'login';
      this.actionChange.next(this.action);
   }

}
