//MODULOS ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//RUTAS
import { AppRoutingModule } from './app-routing.module';

//COMPONENTES
import { AppComponent } from './app.component';

//NG-BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//NGX-SWEETALERT2
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

//ANGULAR MATERIAL
import 'hammerjs';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';

//MODULOS
import { LayoutModule } from './content/layout/layout.module';
import { PartialsModule } from './content/partials/partials.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './core/authentication/authentication.module';

//NGX-PERFECT-SCROLLBAR
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
   // suppressScrollX: true
};

//SERVICIOS
import { UserService } from './core/services/API/user.service';

//NGX-TOASTR
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './core/services/loader.service';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      //MODULOS ANGULAR
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      //BOOTSTRAP
      NgbModule.forRoot(),
      //NGX-SWEETALERT2
      //SweetAlert2Module.forRoot(),
      //NGX-TOASTR
      ToastrModule.forRoot(),
      //ANGULAR MATERIAL
      MatProgressSpinnerModule,
      //MODULOS
      LayoutModule,
      PartialsModule,
      CoreModule,
      AuthenticationModule
   ],
   providers: [
      {
         provide: PERFECT_SCROLLBAR_CONFIG,
         useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      //SERVICIOS
      UserService,
      LoaderService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
