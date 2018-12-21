//ANGULAR
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { CalendarService } from 'src/app/core/services/API/calendar.service';
//COMPONENTES
import { CreateCalendarComponent } from './create-calendar/create-calendar.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
// ngx-sweetalert2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// Constants
import { SWAL_DELETE_CALENDAR, SWAL_SUCCESS_DELETE_CALENDAR } from 'src/app/config/swal_config';


@Component({
   selector: 'cw-calendar',
   templateUrl: './calendar.component.html',
   styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_CALENDAR = SWAL_DELETE_CALENDAR;
   SWAL_SUCCESS_DELETE_CALENDAR = SWAL_SUCCESS_DELETE_CALENDAR;
   //FORM
   calendarForm: FormGroup;
   f_search = '';

   //REGISTERS
   calendars: any[] = [];

   //PAGINATION
   from = 0;
   limit = 20;
   total_calendars = 0;
   total_pages;
   current_page = 1;

   constructor(
      fb: FormBuilder,
      private ngModal: NgbModal,
      private _calendarSrv: CalendarService
   ) {
      this.calendarForm = fb.group({
         limit: [this.limit],
         search: [this.f_search, [Validators.min(2010), Validators.max(3000)]]
      });
   }

   ngOnInit() {
      this.getCalendars();
      console.log("que wea...", SWAL_DELETE_CALENDAR);
   }

   getCalendars() {
      this._calendarSrv.getCalendars(this.from, this.limit)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.calendars = result.items;
            },
            error => {
               console.log("error:", error);
            });
   }

   openCalendarEdit(calendar) {
      const modalRef = this.ngModal.open(EditCalendarComponent);
      modalRef.componentInstance.calendar = calendar;

      modalRef.result.then((result) => {
         if (result) this.getCalendars()
      });
   }



   deleteCalendar(id_calendar) {

      this._calendarSrv.deleteCalendar(id_calendar)
         .subscribe(
            result => {
               console.log("result: ", result);

               this.successSwal.show();
               this.getCalendars()
            },
            error => {
               console.log("error:", error);
            });
   }

   openCreateCalendar() {
      const modalRef = this.ngModal.open(CreateCalendarComponent);
      modalRef.result.then((result) => {
         if (result) this.getCalendars()
      });
   }

   filter() {
      this.f_search = this.calendarForm.value.search;
      console.log("filter: ", this.f_search);

      this._calendarSrv.getCalendars(this.from, this.limit, this.f_search)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.calendars = result.items;
               // this.users = result.users;
               // this.total_users = result.total;
               // this.total_pages = Math.ceil(result.total / this.limit);
               // this.current_page = (this.from / this.limit) + 1;
               // console.log("current page: ", this.current_page)
            },
            error => {
               console.log("error:", error);
            });
   }

   //SI NO FUNCIONA INPUT USAR KEYUP
   validSearch(value) {
      console.log(value);
      let search = this.validYear(value, 4);
      this.calendarForm.controls.search.setValue(search);
      //let rut = this._rutPrv.digitosValidosRut(this.loginForm.value.rut);
      //this.loginForm.controls.rut.setValue(rut); //INSERTO EL RUT LIMPIO EN EL INPUT
   }

   validYear(value, limit) {
      console.log(`value: ${value}, limit: ${limit}, value.length: ${value.length}, typeof: ${typeof (value)}`);
      if (value.length > limit) value = value.slice(0, limit); //SACAR LOS PRIMEROS 4
      return value;
   }

}
