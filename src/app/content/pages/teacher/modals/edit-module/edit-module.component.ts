import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';
//SERVICIOS
import { ModuleService } from 'src/app/core/services/API/module.service';

@Component({
   selector: 'cw-edit-module',
   templateUrl: './edit-module.component.html',
   styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {
   @Input() module;
   moduleForm: FormGroup;
   moduleFormChanges$;

   constructor(
      private fb: FormBuilder,
      private activeModal: NgbActiveModal,
      private _moduleSrv: ModuleService,
      private toastr: ToastrService
   ) {
      this.initFormData();
   }

   ngOnInit() {
   }

   initFormData() {
      this.moduleForm = this.fb.group({
         name: ['', Validators.required]
      });
   }

   loadFormData() {
      this.moduleForm.setValue({
         name: this.module.name,
      })
   }

   updateModule(module){
      console.log("ñee: ", module)
   }

}
