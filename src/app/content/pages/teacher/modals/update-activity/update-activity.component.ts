import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//SERVICIOS
import { ModuleService } from 'src/app/core/services/API/module.service';
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/core/services/API/lesson.service';
import { ActivityService } from 'src/app/core/services/API/activity.service';


@Component({
   selector: 'cw-update-activity',
   templateUrl: './update-activity.component.html',
   styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit, OnDestroy {
   @Input() activity;
   @Input() id_course;

   // Form para Creación
   activityForm: FormGroup;

   // Detección de cambios en el Form
   moduleChanges$: Subscription;
   lessonChanges$: Subscription;
   modeChanges$: Subscription;
   nameChanges$: Subscription;
   statusChanges$: Subscription;

   // Opciones del Selector
   options_lesson;
   options_module;

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _moduleSrv: ModuleService,
      private _lessonSrv: LessonService,
      private toastr: ToastrService,
      private _activitySrv: ActivityService
   ) { }

   ngOnInit() {
      console.log("activity: ", this.activity);
      this.initFormData();
      this.checkFormChanges();
      this.loadFormData();
      this.loadFormOptions();
   }

   initFormData() {
      this.activityForm = this.fb.group({
         module: ['', Validators.required],
         lesson: [''],
         name: ['', [Validators.required]],
         mode: ['', Validators.required],
         status: ['', Validators.required]
      });
   }

   loadFormData() {
      this.activityForm.setValue({
         module: this.activity.id_module,
         lesson: this.activity.id_class,
         name: this.activity.name,
         mode: this.activity.mode,
         status: this.activity.status
      })
   }

   loadFormOptions() {
      // Obtiene los modulos por ID de Curso
      this._moduleSrv.getModulesByCourseId(this.id_course)
         .subscribe(
            result => {
               this.options_module = result;
            },
            error => {
               console.log("error:", error);
            });
   }

   checkFormChanges() {
      this.moduleChanges$ = this.activityForm.get('module').valueChanges.subscribe((changes) => {
         this.activityForm.controls.lesson.setValue('');
         if (changes) {
            if (changes == this.activity.id_module) this.activityForm.get('module').markAsPristine();
            this._lessonSrv.getLessonsByModuleId(changes)
               .subscribe(
                  result => {
                     this.options_lesson = result;
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
         else {
            this.options_lesson = [];
         }
      });

      this.lessonChanges$ = this.activityForm.get('lesson').valueChanges.subscribe((changes) => {
         if (changes == this.activity.id_class) this.activityForm.get('lesson').markAsPristine();
      });

      this.nameChanges$ = this.activityForm.get('name').valueChanges.subscribe((changes) => {
         if (changes == this.activity.name) this.activityForm.get('name').markAsPristine();
      });

      this.modeChanges$ = this.activityForm.get('mode').valueChanges.subscribe((changes) => {
         if (changes == this.activity.mode) this.activityForm.get('mode').markAsPristine();
      });

      this.statusChanges$ = this.activityForm.get('status').valueChanges.subscribe((changes) => {
         if (changes == this.activity.status) this.activityForm.get('status').markAsPristine();
      });

   }

   updateActivity(activity) {
      console.log("activity: ", activity);
      this._activitySrv.updateActivity(this.activity.id_activity, activity.lesson, activity.name, activity.status, activity.mode)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success('La actividad ha sido actualizada correctamente.', 'Actividad actualizado!');
            },
            error => {
               console.log("error:", error);
               this.activeModal.close(false);
               this.toastr.error('La actividad no ha sido actualizada.', 'Ha ocurrido un error!');
            }
         );
   }

   ngOnDestroy() {
      this.moduleChanges$.unsubscribe();
      this.lessonChanges$.unsubscribe();
      this.nameChanges$.unsubscribe();
      this.modeChanges$.unsubscribe();
      this.statusChanges$.unsubscribe();
   }

}
