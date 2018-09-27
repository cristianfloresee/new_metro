//ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';

// COMPONENTES

//GUARDS




const routes: Routes = [
   {
      path: '',
      component: AdminComponent,
      children: [
         {
            path: 'subject', component: SubjectComponent
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdminRoutingModule { }
