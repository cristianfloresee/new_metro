//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//SERVICIOS
import { SubjectService } from 'src/app/core/services/API/subject.service';
import { DIFFICULTIES } from 'src/app/config/constants';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';
import { QuestionService } from 'src/app/core/services/API/question.service';
//RXJS
import { Subscription } from 'rxjs';

@Component({
   selector: 'cw-create-question',
   templateUrl: './create-question.component.html',
   styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {

   id_user;
   questionForm: FormGroup;
   show_message;

   subjectChanges$: Subscription;
   categoryChanges$: Subscription;

   options_subject: Array<any>;
   options_difficulties: Array<any>;
   options_category: Array<any>;
   options_subcategory: Array<any>

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _subjectSrv: SubjectService,
      private _sessionSrv: SessionService,
      private _categorySrv: CategoryService,
      private _subcategorySrv: SubcategoryService,
      private _questionSrv: QuestionService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      //INICIAR VARIABLES
      this.id_user = this._sessionSrv.userSubject.value.id_user;
      this.options_difficulties = DIFFICULTIES;
      //INICIAR FUNCIONES
      this.initFormData();
      this.loadFormOptions();
      this.checkValidFields();
   }

   initFormData() {
      this.questionForm = this.fb.group({
         subject: ['', Validators.required],
         category: ['', Validators.required],
         subcategory: ['', Validators.required],
         description: ['', [Validators.required]],
         difficulty: ['', Validators.required],
      });
   }

   loadFormOptions() {

      this._subjectSrv.getSubjectsByUserId(this.id_user)
         .subscribe(
            (result:any) => {
               this.options_subject = result;
               if(result && result.length == 0) this.show_message = true;
            },
            error => {
               console.log("error:", error);
            });

      //CATEGORÍAS DE USUARIO PROFE
      this.categoryChanges$ = this.questionForm.get('category').valueChanges.subscribe((changes) => {
         this.questionForm.controls.subcategory.setValue('');
         if (changes) {
            this._subcategorySrv.getSubcategoriesByCategoryId(changes)
               .subscribe(
                  (result: any) => {
                     this.options_subcategory = result;
                     console.log("subcategories: ", result);
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
         else {
            this.options_subcategory = [];
         }
      });

   }

   createQuestion(question) {

      this._questionSrv.createQuestion(question.subcategory, question.description, question.difficulty)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success('La pregunta ha sido creada correctamente.', 'Pregunta creada!');
            },
            error => {
               console.log("error: ", error);
               this.toastr.error('No se ha podido crear la pregunta.', 'Ha ocurrido un error!');
            }
         );

   }


   checkValidFields() {

      this.subjectChanges$ = this.questionForm.get('subject').valueChanges.subscribe((changes) => {
         this.questionForm.controls.category.setValue('');
         if (changes) {
            this._categorySrv.getCategoriesByUserIdAndSubjectId(this.id_user, changes)
               .subscribe(
                  (result: any) => {
                     this.options_category = result;
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
         else {
            this.options_category = [];
         }

      });
   }

   ngOnDestroy(){
      this.subjectChanges$.unsubscribe();
      this.categoryChanges$.unsubscribe();
   }

}
