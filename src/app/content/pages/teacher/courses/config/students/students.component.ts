import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/API/user.service';

@Component({
  selector: 'cw-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(
   public fb: FormBuilder,
   private _userSrv: UserService
  ) { }

  ngOnInit() {
  }



}
