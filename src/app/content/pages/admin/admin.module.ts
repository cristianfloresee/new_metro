//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//ROUTING
import { AdminRoutingModule } from './admin-routing.module';
//MODULOS
import { CoreModule } from '../../../core/core.module';
//COMPONENTES
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
   imports: [
      CommonModule,
      CoreModule,
      AdminRoutingModule
   ],
   declarations: [
      AdminComponent,
      SubjectComponent,
      UserComponent,
      CalendarComponent
   ]
})
export class AdminModule { }
