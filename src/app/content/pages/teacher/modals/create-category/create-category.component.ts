
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

@Component({
   selector: 'cw-create-category',
   templateUrl: './create-category.component.html',
   styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

   categoryForm: FormGroup;
   options_subject;

   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _subjectSrv: SubjectService,
      private _categorySrv: CategoryService,
      private _sessionSrv: SessionService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      this.loadFormOptions();
   }

   initFormData() {
      this.categoryForm = this.fb.group({
         subject: ['', Validators.required],
         name: ['', [Validators.required]],
      });
   }

   loadFormOptions() {
      this._subjectSrv.getSubjects()
         .subscribe(
            result => {
               this.options_subject = result;
               console.log("result: ", result);
            },
            error => {
               console.log("error:", error);
            });

   }

   createCategory(category) {

      this._categorySrv.createCategory(this._sessionSrv.userSubject.value.id_user, category.subject, category.name)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success('El categoría ha sido creada correctamente.', 'Categoría creada!');
            },
            error => {
               console.log("error code:", error);
               this.activeModal.close(false);
               this.toastr.error('El período no ha sido creado.', 'Ha ocurrido un error!');
            }
         );
   }

}
