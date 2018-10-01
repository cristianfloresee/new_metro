//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//COMPONENTES
import { StudentComponent } from './student.component';
import { CoreModule } from '../../../core/core.module';

@NgModule({
   imports: [
      CommonModule,
      CoreModule,
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

