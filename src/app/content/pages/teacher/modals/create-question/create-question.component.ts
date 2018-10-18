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
   selector: 'cw-create-question',
   templateUrl: './create-question.component.html',
   styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

   questionForm: FormGroup;

   options_subject;
   options_category;
   options_subcategory;

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
      this.questionForm = this.fb.group({
         description: ['', [Validators.required]],
         difficulty: ['', Validators.required],
         subject: ['', Validators.required],
         category: ['', Validators.required],
         subcategory: ['', Validators.required],
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

}
