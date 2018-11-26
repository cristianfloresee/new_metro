import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { ConfigComponent } from './courses/config/config.component';
import { ActivitiesComponent } from './courses/activities/activities.component';
import { LessonsComponent } from './courses/lessons/lessons.component';
import { StatisticsComponent } from './courses/statistics/statistics.component';
import { QuestionsComponent } from './courses/questions/questions.component';


const routes: Routes = [
   {
      path: '',
      component: TeacherComponent,
   },
   {
      path: 'course/:id/lessons',
      component: LessonsComponent
   },
   {
      path: 'course/:id/config',
      component: ConfigComponent
   },
   {
      path: 'course/:id/activities',
      component: ActivitiesComponent
   },
   {
      path: 'course/:id/questions',
      component: QuestionsComponent
   },
   {
      path: 'course/:id/statistics',
      component: StatisticsComponent
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
