//ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SWEETALERT2
import Swal from 'sweetalert2';
//SERVICIOS
import { SubjectService } from '../../../../core/services/API/subject.service';
//import { SocketService } from '../../../../core/services/socket.service';
//MODALES
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';

@Component({
   selector: 'cw-subject',
   templateUrl: './subject.component.html',
   styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

   subjects;
   //ioConnection;
   f_search = '';
   subjectForm: FormGroup;

    //PAGINATION
    from = 0;
    limit = 5;
    total_calendars = 0;
    total_pages;
    current_page = 1;

   constructor(
      private _subjectSrv: SubjectService,
      fb: FormBuilder,
      private ngModal: NgbModal,
      //private _socketSrv: SocketService
   ) {
      this.subjectForm = fb.group({
         limit: [this.limit],
         search: [this.f_search]
      });
   }

   ngOnInit() {
      this.getSubjects();
   }

   getSubjects() {
      this._subjectSrv.getSubjects(this.from, this.limit)
         .subscribe(
            result => {
               //console.log("result: ", result);
               this.subjects = result;
            },
            error => {
               console.log("error:", error);
            });
   }

   openSubjectEdit(subject) {
      const modalRef = this.ngModal.open(EditSubjectComponent);
      modalRef.componentInstance.subject = subject;

      modalRef.result.then((result) => {
         if (result) this.getSubjects()
      });
   }

   openCreateSubject() {
      const modalRef = this.ngModal.open(CreateSubjectComponent);
      modalRef.result.then((result) => {
         if (result) this.getSubjects()
      });
   }

   deleteSubject(id_subject) {
      console.log("delete user: ", id_subject);
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })

      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿seguro desea eliminar la asignatura?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._subjectSrv.deleteSubject(id_subject)
               .subscribe(
                  result => {
                     console.log("result: ", result);

                     swalWithBootstrapButtons(
                        'Acción realizada!',
                        'El perído ha sido eliminado',
                        'success'
                     )
                     this.getSubjects()
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
      })
   }

   filter() {
      this.f_search = this.subjectForm.value.search;
      console.log("filter: ", this.f_search);

      this._subjectSrv.getSubjects(this.from, this.limit, this.f_search)
         .subscribe(
            result => {
               console.log("result: ", result);
               this.subjects = result;
               // this.users = result.users;
               // this.total_users = result.total;
               // this.total_pages = Math.ceil(result.total / this.limit);
               // this.current_page = (this.from / this.limit) + 1;
               // console.log("current page: ", this.current_page)
            },
            error => {
               console.log("error:", error);
            });
   }

}
