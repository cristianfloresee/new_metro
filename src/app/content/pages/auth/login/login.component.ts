//ANGULAR IMPORTS
import { Component, OnInit, Output, Input, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
//RXJS
import { Subject } from 'rxjs';
//SERVICIOS
import { SessionService } from '../../../../core/authentication/services/session.service';
import { LoaderService } from '../../../../core/services/loader.service';
//LIBRERÍA TERCEROS
//import * as objectPath from 'object-path';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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

   error_response = { show: false, title: '', message: '' };

   constructor(
      fb: FormBuilder,
      public sessionSrv: SessionService,
      public loaderSrv: LoaderService,
      private toastr: ToastrService,
      public router: Router
   ) {
      this.type = 'success';
      this.message = `Usa la cuenta <strong>demo@demo.com</strong> y la contraseña
      <strong>demo</strong> para continuar.`;

      this.loginForm = fb.group({
         'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
         'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });
   }

   ngOnInit() { }


   submit() {
      // this.toastr.success('Hello world!', 'Toastr fun!', {
      //    closeButton: true,
      //    progressBar: true,
      //    progressAnimation: 'increasing'
      // });
      this.loaderSrv.show();
      return this.sessionSrv.login(this.loginForm.value.email, this.loginForm.value.password)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.error_response.show = false;
               this.router.navigate(['/']);
               this.loaderSrv.hide();
            },
            error => {
               this.loaderSrv.hide();
               console.log("error: ", error);
               if (error.status == 0) {
                  this.error_response.show = true;
                  this.error_response.title = 'Error!';
                  this.error_response.message = 'Tenemos un problema en nuestros servidores.'
               }
               else if (error.message = '(email) or password incorrect.') {
                  this.error_response.show = true;
                  this.error_response.title = 'Error!';
                  this.error_response.message = 'correo electrónico o contraseña no válidos.'
               }
            })
   }

   //REEDIRECCIONAMIENTO A LA PÁGINA DE RECUPERACIÓN DE CONTRASEÑA
   forgotPasswordPage() {
      this.action = 'forgot-password';
      this.actionChange.next(this.action);
   }

   sumot() {
      this.toastr.error('Hello world!', 'Toastr fun!', {
         closeButton: true,
         progressBar: true,
         progressAnimation: 'increasing'
      });
   }
}
