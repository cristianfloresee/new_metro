import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from 'src/app/core/services/API/enrollments.service';

@Component({
  selector: 'cw-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(
     private _enrollmentSrv: EnrollmentService
  ) { }

  ngOnInit() {
  }



}
