//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//COMPONENTES
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';
//ROUTING
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
   imports: [
      CommonModule,
      AdminRoutingModule
   ],
   declarations: [
      AdminComponent,
      SubjectComponent,
      UserComponent
   ]
})
export class AdminModule { }
