// Angular
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//MODALS
import { AddStudentComponent } from './add-student/add-student.component';
//SERVICIOS
import { UserService } from 'src/app/core/services/API/user.service';
import { EnrollmentService } from 'src/app/core/services/API/enrollments.service';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// Constants
import { SWAL_DELETE_STUDENT, SWAL_SUCCESS_DELETE_STUDENT } from 'src/app/config/swal_config';
// ngx-sweetalert2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SocketService } from 'src/app/core/services/socket.service';
import { Subscription } from 'rxjs';


@Component({
   selector: 'cw-students',
   templateUrl: './students.component.html',
   styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
   @Input() course;

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_STUDENT = SWAL_DELETE_STUDENT;
   SWAL_SUCCESS_DELETE_STUDENT = SWAL_SUCCESS_DELETE_STUDENT;
   students;

   enrollment$: Subscription;

   constructor(
      private ngModal: NgbModal,
      public fb: FormBuilder,
      private _userSrv: UserService,
      private _enrollmentSrv: EnrollmentService,
      private toastr: ToastrService,
   ) { }

   ngOnInit() {
      //this._userSrv.getUsersByCourseId(this.id_course)
      console.log("CURSITO: ", this.course);

      this.getEnrollments();
      //this._socketSrv.onCreateEnrollment();
      this.initIoConnection();
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
               console.log("STUDENTS: ", this.students);
            },
            error => {
               console.log("error:", error);
            });
   }

   changeStatus(student) {
      console.log("student: ", student);

      this._enrollmentSrv.changeStatusEnrollment(this.course.id_course, student.id_user, !student.active)
         .subscribe(
            result => {
               console.log("enrollments: ", result)
               let status = student.active ? 'habilitado' : 'deshabilitado';
               student.active = !student.active;
               this.toastr.success(`El estudiante ha sido ${status} correctamente.`, `Estudiante ${status}!`);
            },
            error => {
               console.log("error:", error);
               let status = student.active ? 'habilitar' : 'deshabilitar';
               this.toastr.error(`No se ha podido ${status} al estudiante.`, 'Ha ocurrido un error!');
            });
   }

   deleteStudent(id_user) {

      this._enrollmentSrv.deleteEnrollment(this.course.id_course, id_user)
         .subscribe(
            result => {
               console.log("enrollments: ", result)
               this.successSwal.show();
            },
            error => {
               console.log("error:", error);
            });
   }

   initIoConnection(){
      //No enviaré data por socket, solo me servirá para dar una señal y traer nueva data paginada desde el server.
      //Me llegaran todos los emits de todas los cursos. ¿Cómo solucionar esto?
      this.enrollment$ = this._enrollmentSrv.listenEnrollments()
      .subscribe((data)=>{
         console.log("enrollment socket: ", data);
      })
      /*this._socketSrv.onCreateEnrollment()
      .subscribe((data) => {
         this.getEnrollments();
      })*/

   }

   ngOnDestroy(){
      this.enrollment$.unsubscribe();
   }


}
