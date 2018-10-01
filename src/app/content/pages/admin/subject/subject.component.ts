//ANGULAR
import { Component, OnInit } from '@angular/core';
//SERVICIOS
import { SubjectService } from '../../../../core/services/API/subject.service';
import { SocketService } from '../../../../core/services/socket.service';

@Component({
   selector: 'cw-subject',
   templateUrl: './subject.component.html',
   styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

   subjects;
   ioConnection;

   constructor(
      private _subjectSrv: SubjectService,
      private _socketSrv: SocketService
   ) { }

   ngOnInit() {
      this.getSubjects();
   }

   getSubjects() {
      this._subjectSrv.getSubjects()
         .subscribe(
            result => {
               //console.log("result: ", result);
               this.subjects = result;
            },
            error => {
               console.log("error:", error);
            });

      this.ioConnection = this._socketSrv.onSubjects()
         .subscribe((data) => {
            //console.log("data socket: ", data);
         })
   }

}
