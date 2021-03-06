// Angular
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DIFFICULTIES, PAGE_SIZES } from 'src/app/config/constants';
import { QuestionSearchComponent } from '../../../modals/question-search/question-search.component';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { PlayQuestionComponent } from '../play-question/play-question.component';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';
import { LessonService } from 'src/app/core/services/API/lesson.service';
import { WinnersComponent } from '../../../modals/winners/winners.component';


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
   filterForm: FormGroup;

   page_sizes = PAGE_SIZES;

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

   // Class Status
   class_detail;

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

   id_user;

   categoryChanges$: Subscription;

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private ngModal: NgbModal,
      private toastr: ToastrService,
      private _lessonQuestionSrv: LessonQuestionService,
      private _categorySrv: CategoryService,
      private _sessionSrv: SessionService,
      private _subcategorySrv: SubcategoryService,
      private _lessonSrv: LessonService,
      private router: Router
   ) { }

   ngOnInit() {
      this.id_user = this._sessionSrv.userSubject.value.id_user;

      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
         this.id_subject = params.idSubject;
         this.id_lesson = params.idLesson;
      });

      this.initFormData();
      this.loadFormOptions();
      this.checkFormChanges();
      this.getLessonQuestions();
      this.getClassDetail();
   }


   initFormData() {
      this.filterForm = this.fb.group({
         page_size: [this.page_size],
         page: [1],
         id_category: [this.lock_id_category],
         id_subcategory: [this.lock_id_subcategory],
         difficulty: [this.lock_difficulty],
         status: [this.lock_status],
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

   searchQuestion() {
      const modalRef = this.ngModal.open(QuestionSearchComponent, {
         windowClass: 'xlModal'
      });
      modalRef.componentInstance.action = 'Añadir';
      // Sería bueno tener todo el subject en vez de solo el id_subject
      modalRef.componentInstance.id_subject = this.id_subject;
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.id_lesson = this.id_lesson;
      modalRef.componentInstance.class = this.class_detail;
      modalRef.componentInstance.subject = this.class_detail.subject;
      modalRef.componentInstance.course = this.class_detail.course;
      /// Recargar
      modalRef.result.then((result) => {
         if (result) this.getLessonQuestions();
      });
   }

   updateLesson(question) {

   }

   changeStatus(status) {
      console.log("CHANGE: ", status);

      this._lessonSrv.updateLesson(this.id_lesson, this.class_detail.id_module, this.class_detail.description, this.class_detail.date, status)
         .subscribe(
            (result: any) => {

               if (!result) {
                  this.toastr.error('Asegúrate de no tener otra clase iniciada.', 'Ha ocurrido un error!');
               }
               else {
                  this.class_detail.status = status;
                  this.toastr.success('El estado de la clase ha sido actualizado correctamente.', 'Acción realizada!');
               }

            },
            error => {
               console.log("error:", error);
            });
   }

   getClassDetail() {
      this._lessonSrv.getClassById(this.id_lesson)
         .subscribe(
            (result: any) => {
               console.log("getClassById(): ", result)
               this.class_detail = result;
            },
            error => {
               console.log("error:", error);
            });
   }

   volver() {
      this.router.navigate(['/teacher', 'subject', this.id_subject, 'course', this.id_course, 'lesson'])
   }

   // Interface:
   getLessonQuestions() {
      let params = Object.assign({ id_lesson: this.id_lesson }, this.filterForm.value);
      this._lessonQuestionSrv.getLessonQuestions(params)
         .subscribe(
            (result: any) => {
               console.log(" + getLessonQuestions(): ", result);
               this.data_lesson_questions = result.items;
               this.total_items = result.info.total_items;
               this.total_pages = result.info.total_pages;
               this.page = (this.from / this.page_size) + 1;
            },
            error => {
               console.log("error:", error);
            });
   }

   playQuestion(question) {
      console.log("ID LESSON: ", this.id_lesson);
      console.log("quesion: ", question);
      const modalRef = this.ngModal.open(PlayQuestionComponent, {
         windowClass: 'xlModal'
      });
      modalRef.componentInstance.question = question;
      modalRef.componentInstance.id_lesson = this.id_lesson;

      modalRef.result.then((result) => {
         console.log("RESULTE: ", result);
         //if (result)
            this.getLessonQuestions();

      });
   }

   deleteQuestion(id_question) {
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

   filterItems(params) {
      this.lock_id_category = params.id_category;
      this.lock_id_subcategory = params.id_subcategory;
      this.lock_difficulty = params.difficulty;
      this.from = 0;

      this.getLessonQuestions();
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

   changePage(params) {
      this.page_size = params.page_size;
      this.getLessonQuestions();
   }

   getUsersPage(page) {
      if (page != 0 && page <= this.total_pages) {
         this.from = (page - 1) * this.page_size;
         this.page = page;
         this.getLessonQuestions();
      }
   }

   updateWinners(question) {

      console.log("question: ", question);
      const modalRef = this.ngModal.open(WinnersComponent, {
         windowClass: 'xlModal'
      });
      modalRef.componentInstance.id_course = this.id_course;
      modalRef.componentInstance.id_class = this.id_lesson;
      modalRef.componentInstance.question = question;
      // modalRef.componentInstance.activity = activity;
      modalRef.result.then((result) => {
         //if (result) this.getActivities();
      });
   }

}
