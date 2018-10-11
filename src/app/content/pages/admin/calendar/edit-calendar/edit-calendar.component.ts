//CREAR PROPIO DROPDOWN DE AÑOS....
//https://stackblitz.com/edit/angular-zs1rxp
//VER SI SE PUEDE CONFIGURAR ESTO_ https://valor-software.com/ngx-bootstrap/#/datepicker

//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { CalendarService } from 'src/app/core/services/API/calendar.service';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'cw-edit-calendar',
   templateUrl: './edit-calendar.component.html',
   styleUrls: ['./edit-calendar.component.scss']
})
export class EditCalendarComponent implements OnInit {
   @Input() calendar;
   calendarForm: FormGroup;
   calendarFormChanges$;
   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _calendarSrv: CalendarService,
      private toastr: ToastrService,
      private _calendar: NgbCalendar
   ) {

   }


   ngOnInit() {
      console.log("CALENDARIO: ", this.calendar);
      this.initFormData();
      this.loadFormData();
      this.checkFormChanges();
   }

   initFormData() {
      this.calendarForm = this.fb.group({
         year: ['', [Validators.min(2010), Validators.required]],
         semester: ['', Validators.required],
      });
   }

   loadFormData() {
      this.calendarForm.setValue({
         year: this.calendar.year,
         semester: this.calendar.semester
      })
   }

   editCalendar(calendar) {
      console.log("EDIT CALENDAR: ", calendar);
   }

   checkFormChanges() {
      this.calendarFormChanges$ = this.calendarForm.valueChanges
         .subscribe((changes) => {
            for (let field in changes) {
               if (changes[field] === this.calendar[field]) this.calendarForm.get(field).markAsPristine();
            }
         });
   }



}
