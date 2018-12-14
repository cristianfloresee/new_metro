
// Angular
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// ng-bootstrap
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
import { DIFFICULTIES, PAGE_SIZES } from 'src/app/config/constants';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';
import { QuestionService } from 'src/app/core/services/API/question.service';
import { Subscription } from 'rxjs';
import { SWAL_DELETE_QUESTION, SWAL_SUCCESS_DELETE_QUESTION } from 'src/app/config/swal_config';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { TOAST_SUCCESS_UPDATE_QUESTIONS, TOAST_ERROR_UPDATE_QUESTIONS } from 'src/app/config/toastr_config';
@Component({
   selector: 'cw-question-search',
   templateUrl: './question-search.component.html',
   styleUrls: ['./question-search.component.scss']
})
export class QuestionSearchComponent implements OnInit {


   @Input() id_subject;
   @Input() id_course;
   @Input() id_lesson;

   // Opciones de los swal
   SWAL_DELETE_QUESTION = SWAL_DELETE_QUESTION;
   SWAL_SUCCESS_DELETE_QUESTION = SWAL_SUCCESS_DELETE_QUESTION;

   // Form para el filtro y búsqueda
   filterForm: FormGroup;

   page_sizes = PAGE_SIZES;

   id_user;
   categoryChanges$: Subscription;

   // Opciones de selector
   options_category;
   options_subcategory;
   options_difficulty = DIFFICULTIES;

   // Evitan que se haga el mismo filtro
   lock_id_category = '';
   lock_id_subcategory = '';
   lock_difficulty = '';

   add_questions = [];
   delete_questions = [];

   // Data para la tabla
   data_questions;
   data_lesson_questions;
   total_items = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   constructor(
      private fb: FormBuilder,
      //private _moduleSrv: ModuleService,
      //private _lessonSrv: LessonService,
      private _categorySrv: CategoryService,
      private toastr: ToastrService,
      private _sessionSrv: SessionService,
      private _subcategorySrv: SubcategoryService,
      private _questionSrv: QuestionService,
      private _lessonQuestionSrv: LessonQuestionService,
      public activeModal: NgbActiveModal,
   ) { }

   ngOnInit() {
      console.log("id_subject: ", this.id_subject);
      //Init Vars
      this.id_user = this._sessionSrv.userSubject.value.id_user;
      this.initFormData();
      this.loadFormOptions();
      this.checkFormChanges();

      this.getQuestions();
      //this.getLessonQuestions();
      console.log("id user: ", this.id_user);
   }

   initFormData() {
      this.filterForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         // Ver si se puede dejar de depender de los locks
         id_category: this.lock_id_category,
         id_subcategory: this.lock_id_subcategory,
         difficulty: this.lock_difficulty
      });
   }

   loadFormOptions() {

      // Obtiene las categorías por id de usuario y id de asignatura
      this._categorySrv.getCategoriesOptions({ id_user: this.id_user, id_subject: this.id_subject })
         .subscribe(
            (result: any) => {
               this.options_category = result;
               console.log("options category: ", result);
            },
            error => {
               console.log("error:", error);
            });
   }

   checkFormChanges() {
      // Load Category Options
      this.categoryChanges$ = this.filterForm.get('id_category').valueChanges.subscribe((changes) => {
         this.filterForm.controls.id_subcategory.setValue('');
         if (changes) {
            //Load Subcategory Options
            //this._subcategorySrv.getSubcategoriesByCategoryId(changes)
            this._subcategorySrv.getSubcategoriesOptions({ id_category: changes })
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

   getQuestions(params?) {
      params = Object.assign({}, params, { id_user: this.id_user, id_subject: this.id_subject, id_lesson: this.id_lesson });

      this._lessonQuestionSrv.getAllQuestionsForLesson(params)
         .subscribe(
            (result: any) => {
               console.log("QUEST: ", result);
               this.data_questions = this.formatQuestionLessonArray(result.items);
               this.total_items = result.info.total_items;
               this.total_pages = result.info.total_pages;
            },
            error => {
               console.log("error:", error);
            });
   }

   formatQuestionLessonArray(lesson_questions) {
      lesson_questions.forEach(question => {
         question.original_added = question.added;
      });
      return lesson_questions;

   }
   /*
   getLessonQuestions() {
      this._lessonQuestionSrv.getLessonQuestions({ id_lesson: this.id_lesson })
         .subscribe(
            (result: any) => {
               console.log("LESSON_QUESTIONS: ", result);
               this.data_lesson_questions = result.items;
               //this.total_items = result.info.total_items;
               //this.total_pages = result.info.total_pages;
            },
            error => {
               console.log("error:", error);
            });
   }
*/


   filterItems(params) {
      console.log("params: ", params);
      this.lock_id_category = params.id_category;
      this.lock_id_subcategory = params.id_subcategory;
      this.lock_difficulty = params.difficulty;

      Object.assign(params);
      this.getQuestions(params);
   }

   // Obtiene los items de la página correspondiente
   changePage() {
      console.log(this.filterForm.value);
      this.getQuestions(this.filterForm.value);
   }


   changeAvailabiltyLessonQuestion(question) {
      console.log("question: ", question);
      // Cambia el estado añadido/no añadido
      question.added = !question.added;

      // Si el nuevo estado 'added' (añadida/no añadida) es diferente al estado original 'original_added'
      // Si es un nuevo estado entonces debo insertar una petición
      if (question.added != question.original_added) {
         // Si ya estaba añadido entonces corresponde a una eliminación
         if (question.original_added) this.delete_questions.push(question.id_question);
         else this.add_questions.push(question.id_question);


      } else {
         if (question.add) this.deleteFromArray(question.id_question, this.delete_questions);
         else this.deleteFromArray(question.id_question, this.add_questions);
         // Elimina el cambio de estado en el array de peticiones
      }
      console.log("add_question: ", this.add_questions);
      console.log("delete_question: ", this.delete_questions);
   }

   deleteFromArray(id_question, array) {
      // Busco el indice de la solicitud en el array de Solicitudes
      let index = array.indexOf(id_question);
      // Elimino la solicitud
      array.splice(index, 1);
   }




   updateLessonQuestions() {
      this._lessonQuestionSrv.updateLessonQuestions(this.id_lesson, this.add_questions, this.delete_questions)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success(TOAST_SUCCESS_UPDATE_QUESTIONS.message, TOAST_SUCCESS_UPDATE_QUESTIONS.title);
            },
            error => {
               this.toastr.error(TOAST_ERROR_UPDATE_QUESTIONS.message, TOAST_ERROR_UPDATE_QUESTIONS.title);
               console.log("error:", error);
            });
   }


}
