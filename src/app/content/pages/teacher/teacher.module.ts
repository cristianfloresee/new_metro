//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//COMPONENTES
import { TeacherComponent } from './teacher.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ConfigComponent } from './courses/config/config.component';
import { ModulesComponent } from './courses/config/modules/modules.component';
import { StudentsComponent } from './courses/config/students/students.component';
import { CoreModule } from 'src/app/core/core.module';

//RUTAS
@NgModule({
   imports: [
      NgxEchartsModule,
      NgbModule,
      CommonModule,
      CoreModule,
      TeacherRoutingModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   declarations: [TeacherComponent, ConfigComponent, ModulesComponent, StudentsComponent]
})
export class TeacherModule { }
