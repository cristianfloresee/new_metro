//ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
// COMPONENTES
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './header/profile/profile.component';
//GUARDS
import { LoginGuard } from '../../core/services/guards/login.guard';
import { AdminGuard } from '../../core/services/guards/role-admin.guard';
import { TeacherGuard } from '../../core/services/guards/role-teacher.guard';

const routes: Routes = [
   {
      path: '',
      component: PagesComponent,
      canActivate: [LoginGuard],
      children: [
         {
            path: 'admin', canLoad: [AdminGuard], loadChildren: './admin/admin.module#AdminModule', data: { breadcrumb: 'Admin' }
         },
         {
            path: 'teacher', canLoad: [TeacherGuard], loadChildren: './teacher/teacher.module#TeacherModule', data: { breadcrumb: 'Profe' }
         },
         {
            path: 'student', loadChildren: './student/student.module#StudentModule', data: { breadcrumb: 'Estu' }
         },
         { path: '', redirectTo: 'admin', pathMatch: 'full' },
         // {
         // 	path: '',
         // 	loadChildren: './dashboard/dashboard.module#DashboardModule'
         // },
         {
            path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Perfil' }
         }
      ]
   },
   {
      path: 'login',
      loadChildren: './auth/auth.module#AuthModule'
   },
   /*{
      path: 'error',
      //component: ErrorPageComponent
   },*/
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PagesRoutingModule { }
