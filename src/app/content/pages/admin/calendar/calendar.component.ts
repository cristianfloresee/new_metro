//ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SWEETALERT2
import Swal from 'sweetalert2';
//SERVICIOS
import { CalendarService } from 'src/app/core/services/API/calendar.service';
//COMPONENTES
import { CreateCalendarComponent } from './create-calendar/create-calendar.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';


@Component({
   selector: 'cw-calendar',
   templateUrl: './calendar.component.html',
   styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

   userForm: FormGroup;

   calendars: any[] = [];

   f_role = '';
   f_status = '';
   f_search = '';

   from = 0;
   limit = 5;
   total_calendars = 0;
   total_pages;
   current_page = 1;

   constructor(
      fb: FormBuilder,
      private ngModal: NgbModal,
      private _calendarSrv: CalendarService
   ) {
      this.userForm = fb.group({
         limit: [this.limit],
         role: [this.f_role],
         status: [this.f_status],
         search: [this.f_search]
      });
   }

   ngOnInit() {
      this.getCalendars();
   }

   getCalendars(){
      this._calendarSrv.getCalendars(this.from, this.limit)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.calendars= result.results;
               //console.log("NOOOO: ", this.users[0].active);
               //this.total_calendars = result.total;
               //this.total_pages = Math.ceil(result.total / this.limit);
               //this.current_page = (this.from / this.limit) + 1;
               //console.log("current page: ", this.current_page)
            },
            error => {
               console.log("error:", error);
            });
   }

   openCalendarEdit(calendar){
      const modalRef = this.ngModal.open(EditCalendarComponent);
      modalRef.componentInstance.calendar = calendar;
   }



   deleteCalendar(id_calendar) {
      console.log("delete user: ", id_calendar);
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })

      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿seguro desea eliminar el período?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._calendarSrv.deleteCalendar(id_calendar)
               .subscribe(
                  result => {
                     console.log("result: ", result);

                     swalWithBootstrapButtons(
                        'Acción realizada!',
                        'El perído ha sido eliminado',
                        'success'
                     )
                     this.getCalendars()
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
      })
   }

   openCreateCalendar(){
      const modalRef = this.ngModal.open(CreateCalendarComponent);
   }

}
