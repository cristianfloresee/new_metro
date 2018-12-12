//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//RXJS
import { Subscription } from 'rxjs';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//MODALS
import { DeleteCourseComponent } from '../../../modals/delete-course/delete-course.component';
//SERVICIOS
import { CourseService } from 'src/app/core/services/API/course.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubjectService } from 'src/app/core/services/API/subject.service';
import { CalendarService } from 'src/app/core/services/API/calendar.service';


//DEJAR EL FORM EN UN SOLO NIVEL

@Component({
   selector: 'cw-general',
   templateUrl: './general.component.html',
   styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
   @Input() id_course;
   //FORMULARIO
   courseForm: FormGroup;
   id_user;
   course;
   //OPCIONES DE SELECTOR
   options_subject;
   options_calendar;
   //DETECCIÓN DE CAMBIOS EN EL FORMULARIO
   nameChanges$: Subscription;
   subjectChanges$: Subscription;
   courseGoalChanges$: Subscription;
   studentGoalChanges$: Subscription;
   //courseFormChanges$: Subscription;
   yearChanges$: Subscription;
   semesterChanges$: Subscription;
   activeChanges$: Subscription;

   constructor(
      private _sessionSrv: SessionService,
      private fb: FormBuilder,
      private toastr: ToastrService,
      private _courseSrv: CourseService,
      private ngModal: NgbModal,
      private _subjectSrv: SubjectService,
      private _calendarSrv: CalendarService
   ) {
      this.id_user = this._sessionSrv.userSubject.value.id_user;
   }

   ngOnInit() {
      this.initFormData();
      this.loadFormOptions(); //ARREGLAR ESTO DESPUES PORQUE PUEDE CAMBIAR CON EL USO DE SOCKETS..
      this.checkFormChanges();
   }

   ngOnChanges() {
      this.getCourses();
      //      else console.log("nepelio: ", this.options_calendar)
   }

   getCourses() {
      this._courseSrv.getCourseById(this.id_user, this.id_course)
         .subscribe(value => {
            console.log("value: ", value);
            this.course = value;
            setTimeout(() => {
               if (this.options_calendar) this.loadFormData(value);
               else console.log("nepelio: ", this.options_calendar)
            }, 200)

         })
   }

   deleteCourse() {
      const modalRef = this.ngModal.open(DeleteCourseComponent);
      modalRef.componentInstance.course = this.course;
   }

   initFormData() {
      this.courseForm = this.fb.group({
         subject: ['', [Validators.required]],
         name: ['', [Validators.required]],
         code: ['', Validators.required],
         active: ['', Validators.required],
         year: ['', Validators.required],
         semester: ['', Validators.required],
         goalsForm: this.fb.group({
            course_goal: ['', Validators.required],
            student_goal: ['', Validators.required],
         }, { validator: this.validGoals })
      });
   }

   loadFormData(value) {
      //
      let _year = this.options_calendar.find(element => element.year == value.year);
      let _semester = _year.options.find(element => element.semester == value.semester);

      //ASIGNA LOS VALORES AL FORM
      this.courseForm.setValue({
         subject: value.id_subject,
         name: value.name,
         code: value.code.toUpperCase(),
         //active: this.activePipe.transform(value.active),
         active: value.active,
         year: _year.options,
         semester: _semester.id_calendar,
         goalsForm: {
            course_goal: value.course_goal.toString(),
            student_goal: value.student_goal.toString()
         }
      })
   }

   resetFormData() {
      this.loadFormData(this.course);
      this.courseForm.markAsPristine();
   }

   loadFormOptions() {
      //CARGA LAS ASIGNATURAS
      this._subjectSrv.getSubjectsOptions()
         .subscribe(
            result => {
               this.options_subject = result;

            },
            error => {
               console.log("error:", error);
            });
      //CARGA LOS AÑOS Y SEMESTRES (CALENDARIO)
      this._calendarSrv.getCalendars()
         .subscribe(
            result => {
               console.log("calendars: ", result);
               this.options_calendar = this.formatCalendarOptions(result.items);
               // console.log("option_calendar: ", this.options_calendar);
            },
            error => {
               console.log("error:", error);
            });
   }



   //DEJARLO EN UN SERVICIO UTILS
   formatCalendarOptions(data) {
      let new_data = data.reduce((object, item) => {
         object[item.year] = object[item.year] || [];
         object[item.year].push(item);
         return object;
      }, {})
      new_data = Object.keys(new_data).map(key => {
         return { year: key, options: new_data[key] }
      })
      //console.log("calendar: ", new_data);
      return new_data;
   }

   //VERIFICAR SI CAMBIA ALGO ANTES DE HACER UPDATE..


   //VALIDADOR DE METAS
   validGoals(group: FormGroup) {
      const course_goal = Number(group.get('course_goal').value);
      const student_goal = Number(group.get('student_goal').value);
      if (student_goal > course_goal) return { invalidGoals: true }
      else return null;
   }

   checkFormChanges() {

      this.subjectChanges$ = this.courseForm.get('subject').valueChanges.subscribe((changes) => {
         if (changes == this.course.id_subject) this.courseForm.get('subject').markAsPristine();
      })

      this.yearChanges$ = this.courseForm.get('year').valueChanges.subscribe(() => {
         this.courseForm.controls.semester.setValue('');
      });

      this.semesterChanges$ = this.courseForm.get('semester').valueChanges.subscribe(changes => {
         if (changes && changes == this.course.id_calendar) {
            this.courseForm.get('year').markAsPristine();
            this.courseForm.get('semester').markAsPristine();
         }
      })

      //DETECTA CAMBIOS EN EL NOMBRE DEL CURSO
      this.nameChanges$ = this.courseForm.get('name').valueChanges.subscribe((changes) => {
         if (changes == this.course.name) this.courseForm.get('name').markAsPristine();
      })

      //DETECTA CAMBIOS EN LA META DEL CURSO
      this.courseGoalChanges$ = this.courseForm.controls.goalsForm.get('course_goal').valueChanges.subscribe((changes) => {
         let new_value = this.validNumbers(changes)
         if (changes.length != new_value.length) {
            this.courseForm.patchValue({ goalsForm: { course_goal: new_value, } }, { emitEvent: false });
            this.courseForm.controls['goalsForm'].get('course_goal').markAsPristine();
         }
         else {
            if (new_value == this.course.course_goal) this.courseForm.controls['goalsForm'].get('course_goal').markAsPristine();
         }
      });

      //DETECTA CAMBIOS EN LA META DEL ESTUDIANTE
      this.studentGoalChanges$ = this.courseForm.controls.goalsForm.get('student_goal').valueChanges.subscribe((changes) => {
         let new_value = this.validNumbers(changes)
         if (changes.length != new_value.length) {
            this.courseForm.patchValue({ goalsForm: { student_goal: new_value, } }, { emitEvent: false });
            this.courseForm.controls['goalsForm'].get('student_goal').markAsPristine();
         }
         else {
            if (new_value == this.course.student_goal) this.courseForm.controls['goalsForm'].get('student_goal').markAsPristine();
         }
      });

      this.activeChanges$ = this.courseForm.get('active').valueChanges.subscribe((changes) => {
         if (changes == this.course.active) this.courseForm.get('active').markAsPristine();
      })
   }

   //QUITA VALORES QUE NO SEAN NÚMEROS
   validNumbers(value: string) {
      return value.replace(/[^0-9]/g, '');
   }

   ngOnDestroy() {
      this.nameChanges$.unsubscribe();
      this.subjectChanges$.unsubscribe();
      this.courseGoalChanges$.unsubscribe();
      this.studentGoalChanges$.unsubscribe();
      this.yearChanges$.unsubscribe();
      this.semesterChanges$.unsubscribe();
      this.activeChanges$.unsubscribe();
   }

   updateCourse(course) {
      //console.log("update: ", course);

      let _course = { id_calendar: course.semester, id_subject: course.subject, name: course.name, active: course.active, course_goal: course.goalsForm.course_goal, student_goal: course.goalsForm.student_goal }
      this._courseSrv.updateCourse(this.id_course, _course)
         .subscribe(
            result => {
               this.toastr.success('El curso ha sido creado correctamente.', 'Curso creado!');
            },
            error => {
               console.log("error: ", error);
               this.toastr.error('No se ha podido crear el curso.', 'Ha ocurrido un error!');
            }
         )
      //console.log("nepe: ", _course);

   }

}
