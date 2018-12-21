// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// ngx-sweetaler2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// Services
import { CreateActivityComponent } from '../../modals/create-activity/create-activity.component';
import { ModuleService } from 'src/app/core/services/API/module.service';
import { CreateLessonComponent } from '../../modals/create-lesson/create-lesson.component';
import { LessonService } from 'src/app/core/services/API/lesson.service';
import { EditLessonComponent } from '../../modals/edit-lesson/edit-lesson.component';
// Constants
import { SWAL_DELETE_LESSON, SWAL_SUCCESS_DELETE_LESSON } from 'src/app/config/swal_config';


@Component({
   selector: 'cw-lessons',
   templateUrl: './lessons.component.html',
   styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   // Form para el filtro y búsqueda
   filterForm: FormGroup;

   SWAL_DELETE_LESSON = SWAL_DELETE_LESSON;
   SWAL_SUCCESS_DELETE_LESSON = SWAL_SUCCESS_DELETE_LESSON;
   // Opciones de Selector
   options_module;

   // Evita se haga el mismo Filtro (ver si se pueden sacar)
   lock_id_module = '';
   lock_status = '';
   //f_search = '';

   data_lessons;
   total_lessons = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   // Parámetros de la url
   urlParamChanges$: Subscription;
   id_subject;
   id_course;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private _moduleSrv: ModuleService,
      private ngModal: NgbModal,
      private _lessonSrv: LessonService,
      private toastr: ToastrService,
      private router: Router
   ) {
   }

   ngOnInit() {
      // Obtiene los params de la url
      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
         this.id_subject = params.idSubject;
      });

      this.initFormData();
      this.loadFormOptions();
      this.getLessons({ id_course: this.id_course });
   }

   loadFormOptions() {
      this._moduleSrv.getModulesOptions({ id_course: this.id_course })
         .subscribe(
            (result: any) => {
               console.log("opt: ", result)
               this.options_module = result;

            },
            error => {
               console.log("error:", error);
            });
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

   createLesson() {
      const modalRef = this.ngModal.open(CreateLessonComponent);
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.options_module = this.options_module;

   }


   updateLesson(lesson) {
      const modalRef = this.ngModal.open(EditLessonComponent);
      modalRef.componentInstance.lesson = lesson;
      modalRef.componentInstance.options_module = this.options_module;
      modalRef.result.then((result) => {
         if (result) this.getLessons({ id_course: this.id_course })
      });
   }

   // Usar snapshot del router para pasar parámetros
   lessonDetail(lesson) {
      console.log("navigate: ", lesson.id_class.toString());
      //this.router.navigate([lesson.id_class])
      //course/:idCourse/lessons

      // Funciona
      //this.router.navigate(['/teacher', 'subject', 1, 'course', 2, 'lesson', lesson.id_class])
      this.router.navigate([lesson.id_class], { relativeTo: this.route })


   }

   initFormData() {
      this.filterForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         id_module: [this.lock_id_module],
         status: [this.lock_status],
      });
   }

   filterItems(params) {
      console.log("params: ", params);
      this.lock_id_module = params.id_module;
      this.lock_status = params.status;

      Object.assign(params, { id_course: this.id_course });
      this.getLessons(params);
   }

   deleteLesson(id_lesson) {
      this._lessonSrv.deleteLesson(id_lesson)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.successSwal.show();
            },
            error => {
               console.log("error:", error);
               this.toastr.error('La clase no ha sido eliminada porque contiene actividades.', 'Ha ocurrido un error!');

            });

   }

}
