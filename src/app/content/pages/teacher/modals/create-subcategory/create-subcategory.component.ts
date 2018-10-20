
//ANGULAR
import { Component, OnInit } from '@angular/core';
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

@Component({
   selector: 'cw-create-subcategory',
   templateUrl: './create-subcategory.component.html',
   styleUrls: ['./create-subcategory.component.scss']
})
export class CreateSubcategoryComponent implements OnInit {

   subcategoryForm: FormGroup;
   options_category;

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
      this.initFormData()
      this.loadFormOptions();
   }

   initFormData() {
      this.subcategoryForm = this.fb.group({
         category: ['', Validators.required],
         name: ['', [Validators.required]],
      });
   }

   loadFormOptions() {
      this._categorySrv.getCategoriesByUserId(this._sessionSrv.userSubject.value.id_user)
      .subscribe(
         (result: any) => {
            this.options_category = result.results;
            console.log("categories: ", result.results);
         },
         error => {
            console.log("error:", error);
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





}
