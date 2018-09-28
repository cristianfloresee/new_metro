//ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//RUTAS
import { AppRoutingModule } from './app-routing.module';

//COMPONENTES
import { AppComponent } from './app.component';

//NG-BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { InterceptorService } from './core/services/interceptor.service';

//NGX-TOASTR
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './core/services/loader.service';
import { RoleService } from './core/services/role.service';
import { PageService } from './core/services/page.service';
import { SubheaderService } from './core/services/layout/subheader.service';
//GUARDS
import { LoginGuard } from './core/services/guards/login.guard';
import { AdminGuard } from './core/services/guards/role-admin.guard';
import { TeacherGuard } from './core/services/guards/role-teacher.guard';
import { SocketService } from './core/services/socket.service';



@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      //ANGULAR
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      //BOOTSTRAP
      NgbModule.forRoot(),
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
      //INTERCEPTOR
      [
         {
           provide: HTTP_INTERCEPTORS,
           useClass: InterceptorService,
           multi: true
         }
       ],
      //SERVICIOS
      UserService,
      LoaderService,
      RoleService,
      PageService,
      SubheaderService,
      SocketService,
      //GUARDS
      LoginGuard,
      AdminGuard,
      TeacherGuard
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
