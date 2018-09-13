//MODULOS ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//COMPONENTES
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

//ANGULAR MATERIAL
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
//COMPONENTES
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

//SERVICIOS

@NgModule({
   imports: [
      //MODULOS ANGULAR
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      //ANGULAR MATERIAL
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      //
      SweetAlert2Module,
      //ROUTER
      RouterModule.forChild([
         {
            path: '',
            component: AuthComponent
         }
      ])
   ],
   declarations: [
      //COMPONENTES
      AuthComponent,
      LoginComponent,
      AuthNoticeComponent,
      ForgotPasswordComponent,
      RegisterComponent
   ]
})
export class AuthModule { }
