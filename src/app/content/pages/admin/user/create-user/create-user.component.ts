//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { UserService } from '../../../../../core/services/API/user.service';
//NGX-TOASTR
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'cw-create-user',
   templateUrl: './create-user.component.html',
   styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

   userForm: FormGroup;
   constructor(
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _userSrv: UserService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      console.log("USEFORM: ", this.userForm);
   }

   initFormData() {
      this.userForm = this.fb.group({
         name: ['', Validators.required],
         last_name: ['', Validators.required],
         middle_name: ['', Validators.required],
         document_no: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         phone_no: ['', Validators.required],
         username: ['', Validators.required],
         active: [true],
         roles: this.fb.group({
            admin: [''],
            teacher: [''],
            student: ['']
         },
            { validator: this.requiredRoles('admin', 'teacher', 'student') })
      });
   }

   //VALIDADOR
   requiredRoles(rol1, rol2, rol3) {
      return (result: FormGroup) => {
         if (!result.controls[rol1].value && !result.controls[rol2].value && !result.controls[rol3].value) return { requiredRole: true }
         else return null;
      }
   }

   createUser(user) {
      console.log("create user: ", user);
      console.log(this.formatRoleArray(user.roles));
   }

   formatRoleArray(array) {
      let roles = [];
      if (array.admin) roles.push(1);
      if (array.teacher) roles.push(2);
      if (array.student) roles.push(3);
      return roles;
   }

}
