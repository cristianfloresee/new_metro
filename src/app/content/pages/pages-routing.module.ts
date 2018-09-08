import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTES
import { PagesComponent } from './pages.component';

const routes: Routes = [
   {
      path: '',
      component: PagesComponent,
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
