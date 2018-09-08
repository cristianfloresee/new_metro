import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHorizontalOffcanvasDirective } from './directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from './directives/menu-horizontal.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
     //DIRECTIVAS
     MenuHorizontalDirective,
     MenuHorizontalOffcanvasDirective
  ],
  declarations: [
     //DIRECTIVAS
     MenuHorizontalDirective,
     MenuHorizontalOffcanvasDirective
   ]
})
export class CoreModule { }
