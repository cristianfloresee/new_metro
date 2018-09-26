import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './header/profile/profile.component';
//GUARDS
import { LoginGuard } from '../../core/services/guards/login.guard';
import { AdminGuard } from '../../core/services/guards/admin.guard';
import { TeacherGuard } from '../../core/services/guards/teacher.guard';



const routes: Routes = [
   {
      path: '',
      component: PagesComponent,
      canActivate: [LoginGuard],
      children: [
         {
            path: 'admin', canLoad: [AdminGuard], loadChildren: './admin/admin.module#AdminModule'
         },
         {
            path: 'teacher', canLoad: [TeacherGuard], loadChildren: './teacher/teacher.module#TeacherModule'
         },
         {
            path: 'student', loadChildren: './student/student.module#StudentModule'
         },
         { path: '', redirectTo: 'admin', pathMatch: 'full' },
         // {
         // 	path: '',
         // 	loadChildren: './dashboard/dashboard.module#DashboardModule'
         // },
         {
            path: 'profile',
            component: ProfileComponent
         }
      ]
   },
   {
      path: 'login',
      loadChildren: './auth/auth.module#AuthModule'
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PagesRoutingModule { }
