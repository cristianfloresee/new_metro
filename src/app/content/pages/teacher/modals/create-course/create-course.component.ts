import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/core/services/API/subject.service';
import { CalendarService } from 'src/app/core/services/API/calendar.service';
import { CourseService } from 'src/app/core/services/API/course.service';
import { SessionService } from 'src/app/core/services/API/session.service';

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
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      this.loadFormOptions();
      this.checkValidFields();
   }

   initFormData() {
      this.courseForm = this.fb.group({
         name: ['', [Validators.required, Validators.maxLength(15)]],
         subject: ['', Validators.required],
         year: ['', Validators.required],
         semester: ['', Validators.required],
         goalsForm: this.fb.group({
            course_goal: ['', Validators.required],
            student_goal: ['', Validators.required],
         }, { validator: this.validGoals })
      });
   }

   createCourse(course) {

      let id_user = this._sessionSrv.userSubject.value.id_user;
      let _course = { id_calendar: course.semester, id_user: id_user, id_subject: course.subject, name: course.name, course_goal: course.goalsForm.course_goal, student_goal: course.goalsForm.student_goal }
      this._courseSrv.createCourse(_course)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success('El curso ha sido creado correctamente.', 'Curso creado!');
            },
            error => {
               console.log("error: ", error);
               this.toastr.error('No se ha podido crear el curso.', 'Ha ocurrido un error!');

            }
         );

   }

   loadFormOptions() {
      this._subjectSrv.getSubjects()
         .subscribe(
            result => {
               this.options_subject = result;
               //console.log("result: ", result);
            },
            error => {
               console.log("error:", error);
            });

      this._calendarSrv.getCalendars()
         .subscribe(
            result => {
               this.options_calendar = this.formatCalendarOptions(result.results);
               // console.log("option_calendar: ", this.options_calendar);
            },
            error => {
               console.log("error:", error);
            });
   }

   formatCalendarOptions(data) {
      let new_data = data.reduce((object, item) => {
         object[item.year] = object[item.year] || [];
         object[item.year].push(item);
         return object;
      }, {})
      new_data = Object.keys(new_data).map(key => {
         return { year: key, options: new_data[key] }
      })
      return new_data;
   }

   checkValidFields() {
      this.courseForm.controls.goalsForm.get('course_goal').valueChanges.subscribe((changes) => {
         let new_value = this.validNumbers(changes)
         if (changes.length != new_value.length) this.courseForm.patchValue({ goalsForm: { course_goal: new_value, } }, { emitEvent: false });
      });

      this.courseForm.controls.goalsForm.get('student_goal').valueChanges.subscribe((changes) => {
         let new_value = this.validNumbers(changes)
         if (changes.length != new_value.length) this.courseForm.patchValue({ goalsForm: { student_goal: new_value, } }, { emitEvent: false });
      });
   }


   validNumbers(value) {
      return value.replace(/[^0-9]/g, '');
   }

   //VALIDADOR
   validGoals(group: FormGroup) {
      const course_goal = Number(group.get('course_goal').value);
      const student_goal = Number(group.get('student_goal').value);
      if (student_goal > course_goal) return { invalidGoals: true }
      else return null;
   }


}
