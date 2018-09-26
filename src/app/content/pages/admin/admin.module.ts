//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//COMPONENTES
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
         path: '',
         component: AdminComponent
      }
   ])
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
