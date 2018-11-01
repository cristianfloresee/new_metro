import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { ConfigComponent } from './courses/config/config.component';


const routes: Routes = [
   {
      path: '',
      component: TeacherComponent,
   },
   {
      path: 'course/:id/config',
      component: ConfigComponent
   },
   {
      path: '**',
      redirectTo: 'course',
      pathMatch: 'full'
      //component: ErrorPageComponent
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TeacherRoutingModule { }
