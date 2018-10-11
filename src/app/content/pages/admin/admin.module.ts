//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//ROUTING
import { AdminRoutingModule } from './admin-routing.module';
//MODULOS
import { CoreModule } from '../../../core/core.module';
//COMPONENTES
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
//NGX-BOOTSTRAP
import { NgbActiveModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
   imports: [
      CommonModule,
      CoreModule,
      AdminRoutingModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   declarations: [
      AdminComponent,
      SubjectComponent,
      UserComponent,
      CalendarComponent,
   ],
   providers: [
      NgbActiveModal
   ]
})
export class AdminModule { }
