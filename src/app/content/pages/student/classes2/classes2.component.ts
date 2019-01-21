// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/core/services/API/lesson.service';
import { ToastrService } from 'ngx-toastr';
import { PAGE_SIZES } from 'src/app/config/constants';
import { ModuleService } from 'src/app/core/services/API/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayQuestion2Component } from '../modals/play-question2/play-question2.component';

@Component({
   selector: 'cw-classes2',
   templateUrl: './classes2.component.html',
   styleUrls: ['./classes2.component.scss'],
})
export class Classes2Component implements OnInit {

   urlParamChanges$: Subscription;
   id_course;

   page_sizes = PAGE_SIZES;

   // Opciones de Selector
   options_module;

   // Form para el filtro y búsqueda
   filterForm: FormGroup;

   // Evita se haga el mismo Filtro (ver si se pueden sacar)
   lock_id_module = '';
   lock_status = '';

   data_lessons;
   total_items = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private _lessonSrv: LessonService,
      private toastr: ToastrService,
      private _moduleSrv: ModuleService,
      private ngModal: NgbModal
   ) { }

   ngOnInit() {
      this.urlParamChanges$ = this.route.paramMap.subscribe(params => {
         // Si había una socket room abierta la cierro
         if (this.id_course) this.exitToClassSectionRoomAsStudent();
         this.id_course = params.get('idCourse');
         // Ingresa a la socket room
         this.enterToClassSectionRoomAsStudent();
      });

      this.initFormData();
      this.loadFormOptions();
      this.getLessons();

      // Socket

      this.listenSocket();
   }

   filterItems(params) {
      this.lock_id_module = params.id_module;
      this.lock_status = params.status;
      this.from = 0;

      this.getLessons();
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

   ngOnDestroy(){
      this.exitToClassSectionRoomAsStudent();
   }

   enterToClassSectionRoomAsStudent(){
      this._lessonSrv.enterToClassSectionRoomAsStudent({id_course: this.id_course})
   }

   exitToClassSectionRoomAsStudent(){
      this._lessonSrv.exitToClassSectionRoomAsStudent({id_course: this.id_course})
   }

   listenSocket(){
      this._lessonSrv.listenClassCreated()
         .subscribe((data: any) => {
            console.log("listenClassCreated: ", data);
            // Actualiza el sidemenu del estudiante
            this.getLessons();
            this.toastr.success(`Ha sido creada una clase.`, 'Clase Creada!');
         });

         this._lessonSrv.listenClassDeleted()
         .subscribe((data: any) => {
            console.log("listenClassDeleted: ", data);
            // Actualiza el sidemenu del estudiante
            this.getLessons();
            this.toastr.success(`Una clase ha sido eliminada.`, 'Clase Eliminada!');
         });

         this._lessonSrv.listenClassUpdated()
         .subscribe((data: any) => {
            console.log("listenClassUpdated: ", data);
            // Actualiza el sidemenu del estudiante
            this.getLessons();
            this.toastr.success(`Una clase ha sido actualizada.`, 'Clase Actualizada!');
         });
   }

   // Ingresa a la clase (área de juego)
   // + Ver si ya hay alguna preguna iniciada
   enterToClass(_class){
      const modalRef = this.ngModal.open(PlayQuestion2Component, {
         windowClass : 'xlModal'
      });

      modalRef.componentInstance.class = _class;
      modalRef.result.then((result) => {
         //if (result) this.getCalendars()
      });
   }


}
