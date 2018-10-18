//ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CourseService } from './core/services/API/course.service';
import { CalendarService } from './core/services/API/calendar.service';
import { LoaderService } from './core/services/loader.service';
import { RoleService } from './core/services/role.service';
import { PageService } from './core/services/page.service';
import { SubheaderService } from './core/services/layout/subheader.service';

import { InterceptorService } from './core/services/interceptor.service';

//NGX-TOASTR
import { ToastrModule } from 'ngx-toastr';

//GUARDS
import { LoginGuard } from './core/services/guards/login.guard';
import { AdminGuard } from './core/services/guards/role-admin.guard';
import { TeacherGuard } from './core/services/guards/role-teacher.guard';
import { SocketService } from './core/services/socket.service';
import { SubjectService } from './core/services/API/subject.service';
//ENTRY COMPONENTS (MODAL)
import { EditUserComponent } from './content/pages/admin/user/edit-user/edit-user.component';
import { CreateUserComponent } from './content/pages/admin/user/create-user/create-user.component';
import { CreateCalendarComponent } from './content/pages/admin/calendar/create-calendar/create-calendar.component';
import { EditCalendarComponent } from './content/pages/admin/calendar/edit-calendar/edit-calendar.component';
import { CreateSubjectComponent } from './content/pages/admin/subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './content/pages/admin/subject/edit-subject/edit-subject.component';

//COMPONENTE INDIVIDUAL
import { YearDatepickerComponent } from './content/pages/admin/calendar/year-datepicker/year-datepicker.component';
import { CreateCourseComponent } from './content/pages/teacher/modals/create-course/create-course.component';
import { CreateCategoryComponent } from './content/pages/teacher/modals/create-category/create-category.component';
import { CreateSubcategoryComponent } from './content/pages/teacher/modals/create-subcategory/create-subcategory.component';
import { CreateQuestionComponent } from './content/pages/teacher/modals/create-question/create-question.component';

@NgModule({
   declarations: [
      AppComponent,
      CreateUserComponent,
      EditUserComponent,
      CreateCalendarComponent,
      EditCalendarComponent,
      CreateSubjectComponent,
      EditSubjectComponent,
      CreateCourseComponent,
      CreateCategoryComponent,
      CreateSubcategoryComponent,
      CreateQuestionComponent,
      YearDatepickerComponent
   ],
   imports: [
      //ANGULAR
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      //BOOTSTRAP
      NgbModule.forRoot(),
      //NGX-TOASTR
      ToastrModule.forRoot({
         closeButton: true,
         progressBar: true,
         progressAnimation: 'increasing'
      }),
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
      CourseService,
      CalendarService,
      SubjectService,
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
   entryComponents: [
      //MODALS
      CreateUserComponent,
      EditUserComponent,
      CreateCalendarComponent,
      EditCalendarComponent,
      CreateSubjectComponent,
      EditSubjectComponent,
      CreateCourseComponent,
      CreateQuestionComponent,
      CreateCategoryComponent,
      CreateSubcategoryComponent
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
