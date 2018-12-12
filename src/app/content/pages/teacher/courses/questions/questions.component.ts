// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';

// Constants
import { DIFFICULTIES } from 'src/app/config/constants';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';

@Component({
   selector: 'cw-questions',
   templateUrl: './questions.component.html',
   styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

   // Form para el filtro y búsqueda
   filterForm: FormGroup;

   id_user;

   categoryChanges$;

   // Parámetros de la url
   urlParamChanges$
   id_course;
   id_subject;

   // Opciones de selector
   options_category;
   options_subcategory;
   options_difficulty = DIFFICULTIES;

   // Evitan que se haga el mismo filtro
   lock_id_category = '';
   lock_id_subcategory = '';
   lock_difficulty = '';

   page_size = 20;
   page = 1;
   from = ((this.page - 1) * this.page_size);

   constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      //private _moduleSrv: ModuleService,
      private ngModal: NgbModal,
      //private _lessonSrv: LessonService,
      private _categorySrv: CategoryService,
      private toastr: ToastrService,
      private _sessionSrv: SessionService,
      private _subcategorySrv: SubcategoryService
   ) { }

   ngOnInit() {
      // Obtiene los params de la url
      this.urlParamChanges$ = this.route.params.subscribe(params => {
         this.id_course = params.idCourse;
         this.id_subject = params.idSubject;
      });

      //Init Vars
      this.id_user = this._sessionSrv.userSubject.value.id_user;
      this.initFormData();
      this.loadFormOptions();
      this.checkFormChanges();
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
      /*
      this._courseSrv.getCourseById(this.id_user, this.id_course)
         .subscribe(value => {

         }) */


      // Obtiene las opciones categorías por 'id_user' y 'id_subject'.
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

}
