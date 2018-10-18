
//ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//SERVICIOS
import { SubjectService } from 'src/app/core/services/API/subject.service';

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

   createCategory() {
      console.log("create category...");
   }

}
