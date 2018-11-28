//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
//NG-BOOTSTRAP
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//SWEETALERT2
import Swal from 'sweetalert2';
import { CreateActivityComponent } from '../../modals/create-activity/create-activity.component';
import { ActivityService } from 'src/app/core/services/API/activity.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateActivityComponent } from '../../modals/update-activity/update-activity.component';

@Component({
   selector: 'cw-activities',
   templateUrl: './activities.component.html',
   styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

   // Form para el Filtro y Búsqueda
   activityForm: FormGroup;
   id_course;
   parameters$: Subscription;


   // Evita se haga el mismo Filtro
   f_mode = '';
   f_status = '';

   data_activities;
   total_activities = 0;
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
      this.parameters$ = this.route.params.subscribe(params => {
         this.id_course = parseInt(params.id);
         console.log("Curso: ", this.id_course, `, typeof: ${typeof (this.id_course)}`);
      });

      // Obtiene las Actividades por ID de Curso
      this.getActivities({ id_course: this.id_course });
   }

   // Inicializa el Form
   initFormData() {
      this.activityForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         mode: [this.f_mode],
         status: [this.f_status],
         //search: [this.f_search]
      });
   }

   ngOnDestroy() {
      this.parameters$.unsubscribe();
   }

   createActivity() {
      const modalRef = this.ngModal.open(CreateActivityComponent);
      modalRef.componentInstance.id_course = this.id_course;
   }

   updateActivity(activity) {
      const modalRef = this.ngModal.open(UpdateActivityComponent, { size: 'lg'});
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.activity = activity;
   }


   getActivities(params) {
      this._activitySrv.getActivities(params)
         .subscribe(
            (result: any) => {
               console.log("activities: ", result);
               this.data_activities = result.items;
               this.total_activities = result.info.total_items;
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
      this.f_mode = params.mode;
      this.f_status = params.status;
      //Interface: { id_course, mode, status, page, page_size}
      Object.assign(params, { id_course: this.id_course });
      this.getActivities(params);
   }


   deleteActivity(id_activity) {
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })

      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿seguro desea eliminar la actividad?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._activitySrv.deleteActivity(id_activity)
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
                  });
         }
      })
   }





}
