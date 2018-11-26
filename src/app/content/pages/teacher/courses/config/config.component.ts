//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//RXJS
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/API/course.service';
import { SessionService } from 'src/app/core/services/API/session.service';

@Component({
   selector: 'cw-config',
   templateUrl: './config.component.html',
   styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
   id_user;
   id_course;
   course;
   parameters$: Subscription;

   constructor(
      private route: ActivatedRoute,
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService
   ) {
      this.id_user = this._sessionSrv.userSubject.value.id_user;
   }

   ngOnInit() {

      this.parameters$ = this.route.params.subscribe(params => {
         this.id_course = params.id;
         this.getCourse();
      });
   }

   ngOnDestroy() {
      this.parameters$.unsubscribe();
   }

   getCourse() {
      this._courseSrv.getCourseById(this.id_user, this.id_course)
         .subscribe(value => {
            this.course = value;

         })
   }

}
