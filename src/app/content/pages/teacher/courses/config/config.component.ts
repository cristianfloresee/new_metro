// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// RxjS
import { Subscription } from 'rxjs';
// Services
import { CourseService } from 'src/app/core/services/API/course.service';
import { SessionService } from 'src/app/core/services/API/session.service';

@Component({
   selector: 'cw-config',
   templateUrl: './config.component.html',
   styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
   id_user;
   course;

   // Parámetros de la url
   urlParamChanges$: Subscription;
   id_subject;
   id_course;

   constructor(
      private route: ActivatedRoute,
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService
   ) {
      this.id_user = this._sessionSrv.userSubject.value.id_user;
   }

   ngOnInit() {



      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_subject = params.idSubject;
         this.id_course = params.idCourse;
         // Revisar esto...
         this.getCourse();
      });
   }

   ngOnDestroy() {
      this.urlParamChanges$.unsubscribe();
   }

   getCourse() {
      this._courseSrv.getCourseById(this.id_user, this.id_course)
         .subscribe(value => {
            this.course = value;

         })
   }

}
