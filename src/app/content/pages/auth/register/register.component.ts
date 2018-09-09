import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
   selector: 'cw-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   @Input() action: string;
   @Output() actionChange = new Subject<string>();

   model: any = { email: '' };

   constructor() { }

   ngOnInit() {
   }

   loginPage() {
      this.action = 'login';
      this.actionChange.next(this.action);
   }

   submit(){

   }

}
