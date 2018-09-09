//ANGULAR IMPORTS
import { Component, OnInit, Output, Input, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
//RXJS
import { Subject } from 'rxjs';
//LIBRERÍA TERCEROS
import * as objectPath from 'object-path';

@Component({
   selector: 'cw-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   @Input() action: string;
   @Output() actionChange = new Subject<string>();

   valForm: FormGroup;
   model: any = { email: '', password: '' };
   type;
   message;

   errors: any = [];

   constructor(fb: FormBuilder) {
      this.type = 'success';
      this.message = `Usa la cuenta <strong>admin@demo.com</strong> y la contraseña
      <strong>demo</strong> para continuar.`;
   }

   ngOnInit() {
   }

   //AL PRESIONAR BOTÓN LOGIN
   submit() {
      console.log("hola..");
   }

   validate(f: NgForm) {
      if (f.form.status === 'VALID') {
         return true;
      }



      this.errors = [];
      if (objectPath.get(f, 'form.controls.email.errors.email')) {
         this.errors.push('Email is not valid');
      }
      if (objectPath.get(f, 'form.controls.email.errors.required')) {
         this.errors.push('Email is required');
      }

      if (objectPath.get(f, 'form.controls.password.errors.required')) {
         this.errors.push('Password is not valid');
      }
      if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
         this.errors.push('Password minimum length is 7');
      }

      // if (this.errors.length > 0) {
      // 	this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
      // 	this.spinner.active = false;
      // }

      return false;
   }

   //REEDIRECCIONAMIENTO A LA PÁGINA DE RECUPERACIÓN DE CONTRASEÑA
   forgotPasswordPage() {
      console.log("hola mierda...");
      this.action = 'forgot-password';
      console.log("action: ", this.action);
      this.actionChange.next(this.action);
   }

}
