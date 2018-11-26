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

   // Form para el filtro y búsqueda
   activityForm: FormGroup;

   id_course;
   parameters$: Subscription;

   data_activities;

   f_role = '';
   f_status = '';
   f_search = '';

   // Campos para hacer Filtro de Búsqueda
   page_size = 20;
   page = 1;

   total_users = 0;
   total_pages;

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
         this.id_course = params.id;
         console.log("Curso: ", this.id_course);
      });

      this.getActivities();
   }

   // Inicializa el Form
   initFormData() {
      this.activityForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         mode: [this.f_role],
         status: [this.f_status],
         search: [this.f_search]
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
      const modalRef = this.ngModal.open(UpdateActivityComponent);
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.activity = activity;
      //modalRef.componentInstance.options_module = this.options_module;
   }


   getActivities() {
      console.log("ssss");
      this._activitySrv.getActivitiesByCourseId(this.id_course)
         .subscribe(
            result => {
               console.log("activities: ", result);
               this.data_activities = result;
            },
            error => {
               console.log("error code:", error);
            }
         );
   }

   filter(value) {
      console.log("filter: ", value);

      //Interface: { id_course, mode, status, page, page_size}

      //this.f_role = this.userForm.value.role; value.mode
      //this.f_status = this.userForm.value.status; value.status

      /*
            this._activitySrv.getActivitiesByCourseId(this.from, this.limit, this.f_role, this.f_status, this.f_search)
               .subscribe(
                  result => {
                     console.log("result: ", result);
                     this.users = result.users;
                     this.total_users = result.total;
                     this.total_pages = Math.ceil(result.total / this.limit);
                     this.current_page = (this.from / this.limit) + 1;
                     console.log("current page: ", this.current_page)
                  },
                  error => {
                     console.log("error:", error);
                  });
      */

   }



}
