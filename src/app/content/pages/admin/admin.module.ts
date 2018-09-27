//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//COMPONENTES
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';
//ROUTING
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
   imports: [
      CommonModule,
      AdminRoutingModule
   ],
   declarations: [
      AdminComponent,
      SubjectComponent
   ]
})
export class AdminModule { }
