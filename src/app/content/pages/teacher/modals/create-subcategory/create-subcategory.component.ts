
//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
   selector: 'cw-create-subcategory',
   templateUrl: './create-subcategory.component.html',
   styleUrls: ['./create-subcategory.component.scss']
})
export class CreateSubcategoryComponent implements OnInit, OnDestroy {

   subcategoryForm: FormGroup;

   options_category;
   options_subject;

   subjectChanges$: Subscription;
   id_user;

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _subjectSrv: SubjectService,
      private _categorySrv: CategoryService,
      private _sessionSrv: SessionService,
      private toastr: ToastrService,
      private _subcategorySrv: SubcategoryService
   ) { }

   ngOnInit() {
      //INICIAR VARIABLES
      this.id_user = this._sessionSrv.userSubject.value.id_user;
      //INICIAR FUNCIONES
      this.initFormData()
      this.loadFormOptions();
   }

   initFormData() {
      this.subcategoryForm = this.fb.group({
         subject: ['', Validators.required],
         category: ['', Validators.required],
         name: ['', [Validators.required]]
      });
   }

   loadFormOptions() {
      this._subjectSrv.getSubjectsByUserId(this.id_user)
         .subscribe(
            (result: any) => {
               this.options_subject = result;
               //if(result && result.length == 0) this.show_message = true;
               console.log("bulba_result: ", result);
            },
            error => {
               console.log("error:", error);
            });

      this.subcategoryForm.get('subject').valueChanges.subscribe((changes) => {
         this.subcategoryForm.controls.category.setValue('');
         if (changes) {
            this._categorySrv.getCategoriesByUserIdAndSubjectId(this.id_user, changes)
               .subscribe(
                  (result: any) => {
                     this.options_category = result;
                     console.log("categories: ", result);
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




   createSubcategory(subcategory) {
      console.log("create: ", subcategory);
      this._subcategorySrv.createSubcategory(subcategory.category, subcategory.name)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success('La subcategoría ha sido creada correctamente.', 'Subcategoría creada!');
            },
            error => {
               console.log("error code:", error);
               this.activeModal.close(false);
               this.toastr.error('La subcategoría no ha sido creada.', 'Ha ocurrido un error!');
            }
         );
   }


   ngOnDestroy(){

   }


}
