//MODULOS ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//COMPONENTES
import { AuthComponent } from './auth.component';

//ANGULAR MATERIAL
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';

@NgModule({
   imports: [
      //MODULOS ANGULAR
      CommonModule,
      FormsModule,
      //ANGULAR MATERIAL
      MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
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
      AuthComponent
   ]
})
export class AuthModule { }
