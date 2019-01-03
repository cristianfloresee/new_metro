// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/core/services/API/lesson.service';

@Component({
   selector: 'cw-classes2',
   templateUrl: './classes2.component.html',
   styleUrls: ['./classes2.component.scss']
})
export class Classes2Component implements OnInit {

   urlParamChanges$: Subscription;
   id_course;

   data_lessons;
   total_lessons;
   total_pages;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private _lessonSrv: LessonService
   ) { }

   ngOnInit() {
      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
      });

      this.getLessons({ id_course: this.id_course })
   }

   getLessons(params) {
      this._lessonSrv.getLessons(params)
         .subscribe(
            (result: any) => {
               console.log("lessons: ", result);
               this.data_lessons = result.items;
               this.total_lessons = result.info.total_items;
               this.total_pages = result.info.total_pages;
            },
            error => {
               console.log("error code:", error);
            }
         );
   }

}
