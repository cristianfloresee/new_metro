//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//COMPONENTES
import { StudentComponent } from './student.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild([
         {
            path: '',
            component: StudentComponent
         }
      ])
   ],
   declarations: [StudentComponent]
})
export class StudentModule { }

