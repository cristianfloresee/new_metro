//ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
// COMPONENTES
import { AdminComponent } from './admin.component';
import { SubjectComponent } from './subject/subject.component';
import { UserComponent } from './user/user.component';

//GUARDS




const routes: Routes = [
   {
      path: '',
      component: AdminComponent,
      children: [
         {
            path: 'subject', component: SubjectComponent
         },
         {
            path: 'user', component: UserComponent
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdminRoutingModule { }
