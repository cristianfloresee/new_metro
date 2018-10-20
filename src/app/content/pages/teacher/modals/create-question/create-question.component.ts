//ANGULAR
import { Component, OnInit } from '@angular/core';
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

@Component({
   selector: 'cw-create-question',
   templateUrl: './create-question.component.html',
   styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

   questionForm: FormGroup;

   options_subject;
   options_difficulties;
   options_category;
   options_subcategory;

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
      this.initFormData();
      this.loadFormOptions();
   }

   initFormData() {
      this.questionForm = this.fb.group({
         description: ['', [Validators.required]],
         difficulty: ['', Validators.required],
         subject: ['', Validators.required],
         category: ['', Validators.required],
         subcategory: ['', Validators.required],
      });
   }

   loadFormOptions() {
      this.options_difficulties = DIFFICULTIES;
      this._subjectSrv.getSubjects()
         .subscribe(
            result => {
               this.options_subject = result;
               console.log("result: ", result);
            },
            error => {
               console.log("error:", error);
            });

      //CATEGORÍAS DE USUARIO PROFE
      this._categorySrv.getCategoriesByUserId(this._sessionSrv.userSubject.value.id_user)
         .subscribe(
            (result: any) => {
               this.options_category = result.results;
               console.log("categories: ", result.results);
            },
            error => {
               console.log("error:", error);
            });

      this.questionForm.get('category').valueChanges.subscribe((changes) => {
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
         else this.options_subcategory = '';

      });

   }

   createQuestion(question){
      console.log("create: ", question);
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





}
