
import { EnrollmentService } from 'src/app/core/services/API/enrollments.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/API/user.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
//SWEETALERT2
import Swal from 'sweetalert2';

@Component({
   selector: 'cw-add-student',
   templateUrl: './add-student.component.html',
   styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

   @Input() course;
   @Input() students;

   results;
   private searchChanges$: Subscription;
   studentForm: FormGroup;
   constructor(
      private _enrollmentSrv: EnrollmentService,
      public fb: FormBuilder,
      public activeModal: NgbActiveModal,
      private _userSrv: UserService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.initFormData();
      //this.getEnrollments();
      console.log("cursito: ", this.course);
      console.log("students: ", this.students);
   }


   initFormData() {
      this.studentForm = this.fb.group({
         query_field: ['hola'],
         document_no: ['', Validators.required],
      });


      this.searchChanges$ = this.studentForm.get('query_field').valueChanges.pipe(
         debounceTime(200),
         distinctUntilChanged(),
         switchMap((document_no) => this._userSrv.getUsersByDocumentId(document_no, this.course.id_course))
      )
         .subscribe(
            (result: any) => {
               this.results = result.items;
               console.log("stack: ", result)
            },
            error => {
               console.log("error:", error);
            });

      // .valueChanges.subscribe((changes) => {
      //    console.log("search: ", changes);
      // })
   }


   // getEnrollments() {
   //    this._enrollmentSrv.getEnrollmentsByCourseId(this.course.id_course)
   //       .subscribe(
   //          result => {
   //             console.log("enrollments: ", result)
   //          },
   //          error => {
   //             console.log("error:", error);
   //          });
   // }

   searchStudent(student) {
      this._userSrv.getUsersByDocumentId(student.document_no, this.course.id_course)
         .subscribe(
            (result: any) => {
               this.results = result.items;
               console.log("usera: ", result)
            },
            error => {
               console.log("error:", error);
            });
   }


   ngOnDestroy() {
      this.searchChanges$.unsubscribe();
   }

   createEnrollment(student) {
      console.log("enroll student: ", student.id_user);
      this._enrollmentSrv.createEnrollment(this.course.id_course, student.id_user)
         .subscribe(
            result => {
               student.enrolled = !student.enrolled;
               console.log("enrollments: ", result)
               this.toastr.success(`El estudiante ha sido inscrito correctamente.`, `Estudiante Inscrito!`);
            },
            error => {
               console.log("error:", error);
               this.toastr.error(`No se ha podido inscribir al estudiante.`, 'Ha ocurrido un error!');
            });

   }

   deleteEnrollment(student){
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
            this._enrollmentSrv.deleteEnrollment(this.course.id_course, student.id_user)
               .subscribe(
                  result => {
                     console.log("enrollments: ", result)
                     student.enrolled = !student.enrolled;
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
