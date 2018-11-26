//ANGULAR
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//SERVICIOS
import { SubjectService } from 'src/app/core/services/API/subject.service';
import { CategoryService } from 'src/app/core/services/API/category.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { SubcategoryService } from 'src/app/core/services/API/subcategory';
import { QuestionService } from 'src/app/core/services/API/question.service';
//RXJS
import { Subscription } from 'rxjs';
//CONSTANTES
import { DIFFICULTIES } from 'src/app/config/constants';
const IMAGE_EXTS = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

const URL = 'http://localhost:8000/api/upload';

@Component({
   selector: 'cw-create-question',
   templateUrl: './create-question.component.html',
   styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {

   @ViewChild('image_upload') image_upload;
   questionForm: FormGroup;
   public files: any[];

   image_url;
   id_user;
   show_message;

   subjectChanges$: Subscription;
   categoryChanges$: Subscription;
   imageChanges$: Subscription;

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
      //Init Vars
      this.id_user = this._sessionSrv.userSubject.value.id_user;
      this.options_difficulties = DIFFICULTIES;
      //Init Functions
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
         image: ['']
      });
   }

   loadFormOptions() {
      // Load Subject Options
      this._subjectSrv.getSubjectsByUserId(this.id_user)
         .subscribe(
            (result: any) => {
               this.options_subject = result;
               if (result && result.length == 0) this.show_message = true;
            },
            error => {
               console.log("error:", error);
            });

      // Load Category Options
      this.categoryChanges$ = this.questionForm.get('category').valueChanges.subscribe((changes) => {
         this.questionForm.controls.subcategory.setValue('');
         if (changes) {
            //Load Subcategory Options
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
      this._questionSrv.createQuestion(question.subcategory, question.description, question.difficulty, question.image)
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
      //Detect Subject Changes
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

   onFileChanged(event: any) {
      let file = event.target.files[0];

      if (this.hasExtension(file.name, IMAGE_EXTS)) this.renderImage(file)
      else this.deleteFile();
   }

   renderImage(_image) {
      let reader = new FileReader();
      reader.readAsDataURL(_image);
      reader.onload = (event: any) => {
         this.image_url = event.target.result;
         this.questionForm.patchValue({
            image: _image
         })
      }
   }

   hasExtension(filename, exts_array) {
      return (new RegExp('(' + exts_array.join('|').replace(/\./g, '\\.') + ')$')).test(filename);
   }

   deleteFile() {
      //Delete Image DOM
      let image = this.image_upload.nativeElement;
      image.value = null;
      image.files = null;
      this.image_url = null;
      //Delte Image Form
      this.questionForm.patchValue({
         image: null
      })
   }

   ngOnDestroy() {
      this.subjectChanges$.unsubscribe();
      this.categoryChanges$.unsubscribe();
   }

}
