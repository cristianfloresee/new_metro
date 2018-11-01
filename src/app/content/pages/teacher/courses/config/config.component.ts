//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//SERVICIOS
import { CourseService } from 'src/app/core/services/API/course.service';
import { SessionService } from 'src/app/core/services/API/session.service';
//NG-BOOTSTRAP
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivePipe } from 'src/app/core/pipes/active.pipe';



@Component({
   selector: 'cw-config',
   templateUrl: './config.component.html',
   styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

   courseForm: FormGroup;

   parameters;

   id_course;
   id_user;
   course;

   constructor(
      private route: ActivatedRoute,
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService,
      public fb: FormBuilder,
      private activePipe: ActivePipe
   ) { }

   ngOnInit() {

      this.initFormData();

      this.id_user = this._sessionSrv.userSubject.value.id_user;

      this.parameters = this.route.params.subscribe(params => {
         this.id_course = params.id;
         this._courseSrv.getCourseById(this.id_user, this.id_course)
            .subscribe(value => {
               this.course = value;
               this.loadFormData(value);
               console.log("valuo: ", value);
            })


         //this.course = JSON.parse(params.course);
      });

   }

   ngOnDestroy() {
      this.parameters.unsubscribe();
   }

   initFormData() {
      this.courseForm = this.fb.group({
         subject: ['', [Validators.required]],
         name: ['', [Validators.required]],
         code: ['', Validators.required],
         course_goal: ['', Validators.required],
         student_goal: ['', Validators.required],
         active: ['', Validators.required],
         year: ['', Validators.required],
         semester: ['', Validators.required]
      });
   }

   loadFormData(value){
      this.courseForm.setValue({
         subject: value.subject,
         name: value.name,
         code: value.code.toUpperCase(),
         course_goal: value.course_goal,
         student_goal: value.student_goal,
         active: this.activePipe.transform(value.active),
         year: value.year,
         semester: value.semester
      })
   }




}
