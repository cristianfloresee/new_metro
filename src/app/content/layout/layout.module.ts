// MODULOS ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTES
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
   exports: [
      FooterComponent
   ],
   imports: [
      CommonModule,
      RouterModule,
      NgbModule
   ],
   declarations: [
      HeaderComponent,
      FooterComponent
   ]
})
export class LayoutModule { }
