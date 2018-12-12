// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//COMPONENTES
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
//SERVICIOS
import { UserService } from '../../../../core/services/API/user.service';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// ngx-sweetalert2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// Constants
import { SWAL_DELETE_USER, SWAL_SUCCESS_DELETE_USER } from 'src/app/config/swal_config';



@Component({
   selector: 'cw-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_USER = SWAL_DELETE_USER;
   SWAL_SUCCESS_DELETE_USER = SWAL_SUCCESS_DELETE_USER;

   users: any[] = [];

   f_role = '';
   f_status = '';
   f_search = '';

   from = 0;
   limit = 5;
   total_users = 0;
   total_pages;
   current_page = 1;

   userForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private _userSrv: UserService,
      private ngModal: NgbModal
   ) {
      this.userForm = fb.group({
         limit: [this.limit],
         role: [this.f_role],
         status: [this.f_status],
         search: [this.f_search]
      });
   }

   ngOnInit() {
      this.getUsers();
   }

   getUsers() {
      this._userSrv.getUsers(this.from, this.limit)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.users = result.users;
               console.log("NOOOO: ", this.users[0].active);
               this.total_users = result.total;
               this.total_pages = Math.ceil(result.total / this.limit);
               this.current_page = (this.from / this.limit) + 1;
               console.log("current page: ", this.current_page)
            },
            error => {
               console.log("error:", error);
            });
   }

   filter() {

      this.f_role = this.userForm.value.role;
      this.f_status = this.userForm.value.status;
      this.f_search = this.userForm.value.search;
      this.from = 0;

      this._userSrv.getUsers(this.from, this.limit, this.f_role, this.f_status, this.f_search)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.users = result.users;
               this.total_users = result.total;
               this.total_pages = Math.ceil(result.total / this.limit);
               this.current_page = (this.from / this.limit) + 1;
               console.log("current page: ", this.current_page)
            },
            error => {
               console.log("error:", error);
            });

   }

   getUsersFrom(value) {
      console.log("value: ", value);
      let from = this.from + value;

      if (from >= this.total_users) return;
      else if (from < 0) return;

      this.from += value;
      this.getUsers();
   }

   getUsersPage(value) {
      console.log("BUU: ", value);
      this.from = value;
      this.getUsers();
   }

   kisa() {
      this.limit = this.userForm.value.limit;
      this.from = 0;
      this.getUsers();
   }

   deleteUser(id_user) {

      this._userSrv.deleteUser(id_user)
         .subscribe(
            result => {
               this.successSwal.show();
               this.getUsers();
            },
            error => {
               console.log("error:", error);
            });
   }


   openUserEdit(user) {
      const modalRef = this.ngModal.open(EditUserComponent);
      modalRef.componentInstance.user = user;

      modalRef.result.then((result) => {
         console.log("result: ", result);
         if (result) {
            console.log("correct update..");
            this.getUsers()
         }
      }, (reason) => {
         console.log("reason: ", reason);
      });
      //DETECTAR SI SE HACE EL EDIT PARA ACTUALIZAR DATOS....
      //RECIBO LOS DATOS USER Y HAGO EDIT ACA O... HAGO EDIT EN MODAL Y DEVUELVO SI FUE SUCCES O ERROR
   }

   openCreateUser() {
      const modalRef = this.ngModal.open(CreateUserComponent);
   }

}
