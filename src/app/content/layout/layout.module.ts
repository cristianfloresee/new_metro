// MODULOS ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTES
import { HeaderComponent } from './header/header.component';

// BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
     HeaderComponent
   ]
})
export class LayoutModule { }
