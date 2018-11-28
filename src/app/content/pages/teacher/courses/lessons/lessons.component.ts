//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
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

   // Form para el Filtro y Búsqueda
   lessonForm: FormGroup;

   // Opciones de Selector
   options_module;

   id_course;

   // Evita se haga el mismo Filtro
   f_module = '';
   f_status = '';
   //f_search = '';

   data_lessons;
   total_lessons = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   parameters$: Subscription;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private _moduleSrv: ModuleService,
      private ngModal: NgbModal,
      private _lessonSrv: LessonService,
      private toastr: ToastrService
   ) {
   }

   ngOnInit() {

      this.parameters$ = this.route.params.subscribe(params => {
         this.id_course = params.id;
         console.log("Curso: ", this.id_course);
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
   }

   initFormData() {
      this.lessonForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         id_module: [this.f_module],
         status: [this.f_status],
      });
   }

   filterItems(params) {
      console.log("params: ", params);
      this.f_module = params.id_module;
      this.f_status = params.status;

      Object.assign(params, { id_course: this.id_course });
      this.getLessons(params);
   }

   deleteLesson(id_lesson) {
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })

      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿seguro desea eliminar la clase?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._lessonSrv.deleteLesson(id_lesson)
               .subscribe(
                  result => {
                     console.log("result: ", result);

                     swalWithBootstrapButtons(
                        'Acción realizada!',
                        'El usuario ha sido eliminado',
                        'success'
                     )
                     //this.getUsers()
                  },
                  error => {
                     console.log("error:", error);
                     this.toastr.error('La clase no ha sido eliminada porque contiene actividades.', 'Ha ocurrido un error!');
                     //Mostrar Error en Toastr
                  });
         }
      })
   }

}
