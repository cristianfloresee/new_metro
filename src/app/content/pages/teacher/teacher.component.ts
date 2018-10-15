import { Component, OnInit } from '@angular/core';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CourseService } from 'src/app/core/services/API/course.service';
import { CreateCourseComponent } from './modals/create-course/create-course.component';

@Component({
  selector: 'cw-teacher',
  templateUrl: './teacher.component.html',
  styles: []
})
export class TeacherComponent implements OnInit {

  constructor(
     private courseSrv: CourseService,
     private ngModal: NgbModal
  ) { }

  ngOnInit() {
  }



  openCreateCourse(){
   const modalRef = this.ngModal.open(CreateCourseComponent);
}

}
