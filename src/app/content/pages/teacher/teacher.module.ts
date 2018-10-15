//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//COMPONENTES
import { TeacherComponent } from './teacher.component';


@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild([
         {
            path: '',
            component: TeacherComponent
         }
      ])
   ],
   declarations: [TeacherComponent]
})
export class TeacherModule { }
