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
import { PAGE_SIZES } from 'src/app/config/constants';


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

   page_sizes = PAGE_SIZES;

   // Evita se haga el mismo Filtro (ver si se pueden sacar)
   lock_id_module = '';
   lock_status = '';
   //f_search = '';

   data_lessons;
   total_items = 0;
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

      this.urlParamChanges$ = this.route.paramMap.subscribe(params => {
         this.id_subject = params.get('idSubject');
         this.id_course = params.get('idCourse');

         this.initFormData();
         this.loadFormOptions();
         this.getLessons();
      });


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

   getLessons() {
      let params = Object.assign({ id_course: this.id_course }, this.filterForm.value);
      this._lessonSrv.getLessons(params)
         .subscribe(
            (result: any) => {
               console.log("lessons: ", result);
               this.data_lessons = result.items;
               this.total_items = result.info.total_items;
               this.total_pages = result.info.total_pages;
               this.page = (this.from / this.page_size) + 1;
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
      modalRef.result.then((result) => {
         if (result) this.getLessons();
      });
   }


   updateLesson(lesson) {
      const modalRef = this.ngModal.open(EditLessonComponent);
      modalRef.componentInstance.lesson = lesson;
      modalRef.componentInstance.options_module = this.options_module;
      modalRef.result.then((result) => {
         if (result) this.getLessons()
      });
   }

   // Usar snapshot del router para pasar parámetros
   lessonDetail(lesson) {
      console.log("navigate: ", lesson.id_class.toString());
      this.router.navigate([lesson.id_class], { relativeTo: this.route })
   }

   initFormData() {
      this.lock_id_module = '';
      this.lock_status = '';

      this.filterForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         id_module: [this.lock_id_module],
         status: [this.lock_status],
      });
   }

   filterItems(params) {
      this.lock_id_module = params.id_module;
      this.lock_status = params.status;
      this.from = 0;

      this.getLessons();
   }

   deleteLesson(id_lesson) {
      this._lessonSrv.deleteLesson(id_lesson)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.getLessons();
               this.successSwal.show();
            },
            error => {
               console.log("error:", error);
               this.toastr.error('La clase no ha sido eliminada porque contiene actividades.', 'Ha ocurrido un error!');
            });
   }

   changePage(params) {
      this.page_size = params.page_size;
      this.getLessons();
   }

   getUsersPage(page) {
      if (page != 0 && page <= this.total_pages) {
         this.from = (page - 1) * this.page_size;
         this.page = page;
         this.getLessons();
      }
   }

}
