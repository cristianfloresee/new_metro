//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//MODALS
import { AddStudentComponent } from './add-student/add-student.component';
//SERVICIOS
import { UserService } from 'src/app/core/services/API/user.service';
import { EnrollmentService } from 'src/app/core/services/API/enrollments.service';
//SWEETALERT2
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'cw-students',
   templateUrl: './students.component.html',
   styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
   @Input() course;
   students;

   constructor(
      private ngModal: NgbModal,
      public fb: FormBuilder,
      private _userSrv: UserService,
      private _enrollmentSrv: EnrollmentService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      //this._userSrv.getUsersByCourseId(this.id_course)
      console.log("cursito: ", this.course);
      this.getEnrollments();
   }


   addStudent() {
      //ENVIAR EL ID_COURSE
      const modalRef = this.ngModal.open(AddStudentComponent, { size: 'lg' });
      modalRef.componentInstance.course = this.course;
      modalRef.componentInstance.students = this.students;

      // modalRef.result.then((result) => {
      //    if (result) this.getModules()
      // });
   }

   getEnrollments() {
      this._enrollmentSrv.getEnrollmentsByCourseId(this.course.id_course)
         .subscribe(
            (result: any) => {
               console.log("enrollments: ", result)
               this.students = result.items;
            },
            error => {
               console.log("error:", error);
            });
   }

   changeStatus(student) {
      console.log("student: ", student);

      this._enrollmentSrv.changeStatusEnrollment(this.course.id_course, student.id_user, !student.disabled)
         .subscribe(
            result => {
               console.log("enrollments: ", result)
               let status = student.disabled ? 'habilitado' : 'deshabilitado';
               student.disabled = !student.disabled;
               this.toastr.success(`El estudiante ha sido ${status} correctamente.`, `Estudiante ${status}!`);
            },
            error => {
               console.log("error:", error);
               let status = student.disabled ? 'habilitar' : 'deshabilitar';
               this.toastr.error(`No se ha podido ${status} al estudiante.`, 'Ha ocurrido un error!');
            });
   }

   deleteStudent(id_user) {
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })


      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿Seguro desea eliminar a este alumno del Curso?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._enrollmentSrv.deleteEnrollment(this.course.id_course, id_user)
               .subscribe(
                  result => {
                     console.log("enrollments: ", result)
                     swalWithBootstrapButtons(
                        'Acción realizada!',
                        'El estudiante ha sido eliminado',
                        'success'
                     )
                     //this.getModules();
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
      })






   }


}
