import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
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
   registerForm: FormGroup;

   constructor(fb: FormBuilder) {
      this.registerForm = fb.group({
         'names': ['', Validators.required],
         'lastname': ['', Validators.required],
         'middlename': ['', Validators.required],
         'email': ['', [Validators.required, CustomValidators.email]],
         'document': ['', Validators.required],
         'username': ['', Validators.required],
         'password': ['', Validators.required],
         'password2': ['', Validators.required]
      },
         { validator: this.equalPasswords('password', 'password2') }

      );
   }

   ngOnInit() {

   }

   loginPage() {
      this.action = 'login';
      this.actionChange.next(this.action);
   }

   submit() {
      console.log(this.registerForm.value);
      console.log(this.registerForm.valid);
      console.log(this.registerForm);
      if(this.registerForm.invalid){
         console.log("formulario invalido...");
      }
   }

   //COMPRUEBA SI LAS CONTRASEÑAS SON IGUALES
   equalPasswords(password1, password2) {
      return (result: FormGroup) => {
         let pass1 = result.controls[password1].value;
         let pass2 = result.controls[password2].value;

         if (pass1 === pass2) return null;
         return { areEquals: true }
      }
   }

   equalPassword(control: AbstractControl) {
      const pass1 = control.get('password');
      const pass2 = control.get('password2');
      if ((pass2 != null) && (pass1 === pass2)) return null;
      return { areEquals: true };
   }

}
