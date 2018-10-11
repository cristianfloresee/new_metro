//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { CalendarService } from 'src/app/core/services/API/calendar.service';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';


@Component({
   selector: 'cw-create-calendar',
   templateUrl: './create-calendar.component.html',
   styleUrls: ['./create-calendar.component.scss']
})
export class CreateCalendarComponent implements OnInit {

   calendarForm: FormGroup;

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _calendarSrv: CalendarService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
   }

   initFormData() {
      this.calendarForm = this.fb.group({
         year: ['', [Validators.min(2010), Validators.max(3000), Validators.required]],
         semester: ['', Validators.required],
      });
   }

   createCalendar(calendar) {

      // return this._calendarSrv.createCalendar()
      //    .subscribe(
      //       result => {
      //          this.activeModal.close(true);
      //          this.toastr.success('El usuario ha sido actualizado correctamente.', 'Usuario actualizado!', {
      //             closeButton: true,
      //             progressBar: true,
      //             progressAnimation: 'increasing'
      //          });
      //       },
      //       error => {
      //          console.log("error:", error);
      //          this.activeModal.close(false);
      //          this.toastr.error('El usuario no ha sido actualizado.', 'Ha ocurrido un error!', {
      //             closeButton: true,
      //             progressBar: true,
      //             progressAnimation: 'increasing'
      //          });
      //       }
      //    );
      console.log("CREATE CALENDAR: ", calendar);
   }
}
