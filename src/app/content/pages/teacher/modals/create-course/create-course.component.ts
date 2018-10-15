import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/core/services/API/subject.service';
import { CalendarService } from 'src/app/core/services/API/calendar.service';

@Component({
   selector: 'cw-create-course',
   templateUrl: './create-course.component.html',
   styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

   courseForm: FormGroup;

   //SELECT OPTIONS
   options_subject;
   options_calendar;

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      public _subjectSrv: SubjectService,
      private _calendarSrv: CalendarService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      this.loadFormOptions();
   }

   initFormData() {
      this.courseForm = this.fb.group({
         name: ['', [Validators.required]],
         subject: ['', Validators.required],
         year: ['', Validators.required],
         semester: ['', Validators.required]
      });
   }

   createCourse(course) {
      console.log("course: ", course);
   }

   loadFormOptions() {
      this._subjectSrv.getSubjects()
         .subscribe(
            result => {
               this.options_subject = result;
               console.log("result: ", result);
            },
            error => {
               console.log("error:", error);
            });

      this._calendarSrv.getCalendars()
         .subscribe(
            result => {
               this.options_calendar = result.results;
               console.log("result: ", this.options_calendar);
            },
            error => {
               console.log("error:", error);
            });

      // this.courseForm.setValue({
      //    year: this.calendar.year,
      //    semester: this.calendar.semester
      // })
   }

}
