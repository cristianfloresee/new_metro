// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
// ng-bootstrap
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateActivityComponent } from '../../modals/create-activity/create-activity.component';
import { ActivityService } from 'src/app/core/services/API/activity.service';

import { UpdateActivityComponent } from '../../modals/update-activity/update-activity.component';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// ngx-sweetaler2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// Constants
import { SWAL_DELETE_ACTIVITY, SWAL_SUCCESS_DELETE_ACTIVITY } from 'src/app/config/swal_config';

@Component({
   selector: 'cw-activities',
   templateUrl: './activities.component.html',
   styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   // Form para el filtro y búsqueda
   filterForm: FormGroup;

   // Opciones de los swal
   SWAL_DELETE_ACTIVITY = SWAL_DELETE_ACTIVITY;
   SWAL_SUCCESS_DELETE_ACTIVITY = SWAL_SUCCESS_DELETE_ACTIVITY;

   // Parámetros de la url
   urlParamChanges$: Subscription;
   id_subject;
   id_course;

   // Evita se haga el mismo filtro de búsqueda
   // también se puede manejar con markPristine(), averiguar que opción es mejor.
   // teniendo en cuenta el detectChanges(), usar markPristine limpiaría la plantilla!
   f_mode = '';
   f_status = '';

   // Data para la tabla
   data_activities;
   total_items = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private ngModal: NgbModal,
      private _activitySrv: ActivityService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      // Obtiene los params de la url
      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
         this.id_subject = params.idSubject;
      });

      // Obtiene las Actividades por ID de Curso
      this.getActivities({ id_course: this.id_course });
   }

   // Inicializa el Form
   initFormData() {
      this.filterForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         mode: [this.f_mode],
         status: [this.f_status],
         //search: [this.f_search]
      });
   }

   ngOnDestroy() {
      this.urlParamChanges$.unsubscribe();
   }

   createActivity() {
      const modalRef = this.ngModal.open(CreateActivityComponent);
      modalRef.componentInstance.id_course = this.id_course;
   }

   updateActivity(activity) {
      const modalRef = this.ngModal.open(UpdateActivityComponent, { size: 'lg' });
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.activity = activity;
      modalRef.result.then((result) => {
         if (result) this.getActivities({ id_course: this.id_course });
      });

   }


   getActivities(params) {
      this._activitySrv.getActivities(params)
         .subscribe(
            (result: any) => {
               console.log("activities: ", result);
               this.data_activities = result.items;
               this.total_items = result.info.total_items;
               this.total_pages = result.info.total_pages;
            },
            error => {
               console.log("error code:", error);
            }
         );
   }

   // ----------------------------------------
   // Filtra los registros de la tabla
   // ----------------------------------------
   filterItems(params) {
      // Establece los params de filtro para no repetir la misma búsqueda
      this.f_mode = params.mode;
      this.f_status = params.status;
      //Interface: { id_course, mode, status, page, page_size}
      Object.assign(params, { id_course: this.id_course });
      this.getActivities(params);
   }


   deleteActivity(id_activity) {
      this._activitySrv.deleteActivity(id_activity)
         .subscribe(
            result => {
               console.log("nowa: ", result);
               this.successSwal.show();
            },
            error => {
               console.log("error:", error);
            });
   }


}
