import { Component, OnInit } from '@angular/core';
//NG-BOOTSTRAP
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//SERVICIOS
import { CourseService } from 'src/app/core/services/API/course.service';
//MODALS
import { CreateCourseComponent } from './modals/create-course/create-course.component';
import { CreateCategoryComponent } from './modals/create-category/create-category.component';
import { CreateSubcategoryComponent } from './modals/create-subcategory/create-subcategory.component';
import { CreateQuestionComponent } from './modals/create-question/create-question.component';

@Component({
   selector: 'cw-teacher',
   templateUrl: './teacher.component.html',
   styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

   constructor(
      private courseSrv: CourseService,
      private ngModal: NgbModal
   ) { }

   ngOnInit() {
   }



   openCreateCourse() {
      const modalRef = this.ngModal.open(CreateCourseComponent);
   }

   openCreateAnswer() {
      const modalRef = this.ngModal.open(CreateQuestionComponent);
   }

   openCreateCategory() {
      const modalRef = this.ngModal.open(CreateCategoryComponent);
   }

   openCreateSubcategory() {
      const modalRef = this.ngModal.open(CreateSubcategoryComponent);
   }
}
