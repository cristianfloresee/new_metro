// Angular
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// ngx-sweetaler2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// Services

// Constants
import { SWAL_DELETE_LESSON_QUESTION, SWAL_SUCCESS_DELETE_LESSON_QUESTION } from 'src/app/config/swal_config';
import { DIFFICULTIES } from 'src/app/config/constants';
import { QuestionSearchComponent } from '../../../modals/question-search/question-search.component';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { PlayQuestionComponent } from '../play-question/play-question.component';


@Component({
   selector: 'cw-lesson-detail',
   templateUrl: './lesson-detail.component.html',
   styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {


   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_LESSON_QUESTION = SWAL_DELETE_LESSON_QUESTION;
   SWAL_SUCCESS_DELETE_LESSON_QUESTION = SWAL_SUCCESS_DELETE_LESSON_QUESTION;

   // Form para el filtro y búsqueda
   lessonForm: FormGroup;


   // Opciones de selector
   options_category;
   options_subcategory;
   options_difficulty = DIFFICULTIES;

   // Evita se haga el mismo Filtro (ver si se pueden sacar)
   lock_id_module = '';
   lock_status = '';
   //f_search = '';
   // Evitan que se haga el mismo filtro
   lock_id_category = '';
   lock_id_subcategory = '';
   lock_difficulty = '';

   // Data para la tabla
   data_lesson_questions;
   total_items = 0;
   total_pages;
   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   // Parámetros de la url
   urlParamChanges$: Subscription;
   id_subject;
   id_course;
   id_lesson;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private ngModal: NgbModal,
      private toastr: ToastrService,
      private _lessonQuestionSrv: LessonQuestionService
   ) { }

   ngOnInit() {
      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
         this.id_subject = params.idSubject;
         this.id_lesson = params.idLesson;
         console.log("ID LESSON: ", this.id_lesson);
      });
      this.initFormData();
      this.getLessonQuestions();
   }


   initFormData() {
      this.lessonForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         id_category: [this.lock_id_category],
         id_subcategory: [this.lock_id_subcategory],
         difficulty: [this.lock_difficulty],
         status: [this.lock_status],
      });
   }

   searchQuestion() {
      const modalRef = this.ngModal.open(QuestionSearchComponent, { size: 'lg' });
      modalRef.componentInstance.action = 'Añadir';
      modalRef.componentInstance.id_subject = this.id_subject;
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.id_lesson = this.id_lesson;
      /// Recargar
      modalRef.result.then((result) => {
         if (result) this.getLessonQuestions();
      });
   }

   updateLesson(question) {

   }


   getLessonQuestions() {
      this._lessonQuestionSrv.getLessonQuestions({ id_lesson: this.id_lesson })
         .subscribe(
            (result: any) => {
               console.log("LESSON_QUESTIONS: ", result);
               this.data_lesson_questions = result.items;
               this.total_items = result.info.total_items;
               this.total_pages = result.info.total_pages;
            },
            error => {
               console.log("error:", error);
            });
   }

   playQuestion(question) {
      console.log("ID LESSON: ", this.id_lesson);
      console.log("quesion: ", question);
      const modalRef = this.ngModal.open(PlayQuestionComponent, { size: 'lg' });
      modalRef.componentInstance.question = question;
      modalRef.componentInstance.id_lesson = this.id_lesson;

      modalRef.result.then((result) => {
         console.log("RESULTE: ", result);
         if (result) this.getLessonQuestions();
      });
   }

   deleteQuestion(id_question) {
      console.log("id question: ", id_question);
      console.log("id class: ", this.id_lesson);
      this._lessonQuestionSrv.deleteLessonQuestion(this.id_lesson, id_question)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.successSwal.show();
               this.getLessonQuestions();
            },
            error => {
               console.log("error:", error);
               this.toastr.error('La clase no ha sido eliminada porque contiene actividades.', 'Ha ocurrido un error!');
            });

   }

}
