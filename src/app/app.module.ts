// MODULOS ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RUTAS
import { AppRoutingModule } from './app-routing.module';

// COMPONENTES
import { AppComponent } from './app.component';

// BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// MODULOS
import { LayoutModule } from './content/layout/layout.module';
import { PartialsModule } from './content/partials/partials.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './core/auth/authentication/authentication.module';

// PERFECT SCROLLBAR
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
   // suppressScrollX: true
};



@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgbModule.forRoot(),
      LayoutModule,
      PartialsModule,
      CoreModule,
      AuthenticationModule
   ],
   providers: [
      {
         provide: PERFECT_SCROLLBAR_CONFIG,
         useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
