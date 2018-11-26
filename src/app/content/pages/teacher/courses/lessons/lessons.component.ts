//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SWEETALERT2
import Swal from 'sweetalert2';
import { CreateActivityComponent } from '../../modals/create-activity/create-activity.component';
import { ModuleService } from 'src/app/core/services/API/module.service';
import { CreateLessonComponent } from '../../modals/create-lesson/create-lesson.component';
import { LessonService } from 'src/app/core/services/API/lesson.service';
import { EditLessonComponent } from '../../modals/edit-lesson/edit-lesson.component';



@Component({
   selector: 'cw-lessons',
   templateUrl: './lessons.component.html',
   styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

   options_module;
   lessonForm: FormGroup;

   data_lessons;

   id_course;
   from = 0;
   limit = 5;
   f_role = '';
   f_status = '';
   f_search = '';
   parameters$: Subscription;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private _moduleSrv: ModuleService,
      private ngModal: NgbModal,
      private _lessonSrv: LessonService
   ) {
   }

   ngOnInit() {

      this.parameters$ = this.route.params.subscribe(params => {
         this.id_course = params.id;
         console.log("Curso: ", this.id_course);
      });
      this.initFormData();
      this.loadFormOptions();
      this.getLessons();
   }

   loadFormOptions() {
      this._moduleSrv.getModulesByCourseId(this.id_course)
         .subscribe(
            (result: any) => {
               console.log("opt: ", result)
               this.options_module = result;

            },
            error => {
               console.log("error:", error);
            });
   }

   getLessons() {
      this._lessonSrv.getLessonsByCourseId(this.id_course)
         .subscribe(
            result => {
               console.log("lessons: ", result);
               this.data_lessons = result;
            },
            error => {
               console.log("error code:", error);

            }
         );
   }

   createLesson() {
      const modalRef = this.ngModal.open(CreateLessonComponent);
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.options_module = this.options_module;
   }


   updateLesson(lesson){
      const modalRef = this.ngModal.open(EditLessonComponent);
      modalRef.componentInstance.lesson = lesson;
      modalRef.componentInstance.options_module = this.options_module;
   }

   initFormData() {
      this.lessonForm = this.fb.group({
         limit: [this.limit],
         module: [this.f_role],
         status: [this.f_status],
         search: [this.f_search]
      });
   }

}
