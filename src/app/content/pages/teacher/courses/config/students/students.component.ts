//ANGULAR
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//MODALS
import { AddStudentComponent } from './add-student/add-student.component';
//SERVICIOS
import { UserService } from 'src/app/core/services/API/user.service';

@Component({
   selector: 'cw-students',
   templateUrl: './students.component.html',
   styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
   @Input() id_course;

   constructor(
      private ngModal: NgbModal,
      public fb: FormBuilder,
      private _userSrv: UserService,
   ) { }

   ngOnInit() {
      //this._userSrv.getUsersByCourseId(this.id_course)
   }


   addStudent() {
      //ENVIAR EL ID_COURSE
      const modalRef = this.ngModal.open(AddStudentComponent);
      modalRef.componentInstance.id_course = this.id_course;

      // modalRef.result.then((result) => {
      //    if (result) this.getModules()
      // });
   }



}
