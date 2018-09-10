//ANGULAR IMPORTS
import { Component, OnInit, Output, Input, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
//RXJS
import { Subject } from 'rxjs';
import { SessionService } from '../../../../core/authentication/services/session.service';

//LIBRERÍA TERCEROS
//import * as objectPath from 'object-path';

@Component({
   selector: 'cw-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   @Input() action: string;
   @Output() actionChange = new Subject<string>();

   loginForm: FormGroup;

   type;
   message;

   errors: any = [];

   constructor(
      fb: FormBuilder,
      sessionSrv: SessionService
   ) {
      this.type = 'success';
      this.message = `Usa la cuenta <strong>admin@demo.com</strong> y la contraseña
      <strong>demo</strong> para continuar.`;

      this.loginForm = fb.group({
         'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
         'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });
   }

   ngOnInit() {
   }

   //AL PRESIONAR BOTÓN LOGIN
   submit() {
      console.log(this.loginForm.value);
   }

   // validate(f: NgForm) {
   //    if (f.form.status === 'VALID') {
   //       return true;
   //    }



   //    this.errors = [];
   //    if (objectPath.get(f, 'form.controls.email.errors.email')) {
   //       this.errors.push('Email is not valid');
   //    }
   //    if (objectPath.get(f, 'form.controls.email.errors.required')) {
   //       this.errors.push('Email is required');
   //    }

   //    if (objectPath.get(f, 'form.controls.password.errors.required')) {
   //       this.errors.push('Password is not valid');
   //    }
   //    if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
   //       this.errors.push('Password minimum length is 7');
   //    }

   //    // if (this.errors.length > 0) {
   //    // 	this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
   //    // 	this.spinner.active = false;
   //    // }

   //    return false;
   // }

   //REEDIRECCIONAMIENTO A LA PÁGINA DE RECUPERACIÓN DE CONTRASEÑA
   forgotPasswordPage() {
      this.action = 'forgot-password';
      this.actionChange.next(this.action);
   }

}
