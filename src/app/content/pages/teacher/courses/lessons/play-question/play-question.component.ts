import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'cw-play-question',
   templateUrl: './play-question.component.html',
   styleUrls: ['./play-question.component.scss']
})
export class PlayQuestionComponent implements OnInit {
   @Input() question;
   @Input() id_lesson;
   constructor(
      public activeModal: NgbActiveModal,
      private _lessonQuestionSrv: LessonQuestionService,
      private socketSrv: SocketService,
      private toastr: ToastrService
   ) { }

   // Indica si se actualizo el estado de la clase
   update;

   question_status: number;
   ngOnInit() {
      console.log("QUESTION: ", this.question);
      this.question_status = this.question.status;
   }

   initParticipation(status) {
      // 1: no iniciada, 2: iniciada 3: terminada
      if (status == 1) this.question_status = 2;
      if (status == 2) this.question_status = 1;
      //this.question_status = !this.question_status;
      console.log("ID LESSON: ", this.id_lesson);
      this._lessonQuestionSrv.updateLessonQuestion(this.id_lesson, this.question.id_question, this.question_status)
         .subscribe(
            result => {
               this.update = true;
               console.log("result: ", result);

            },
            error => {
               console.log("error:", error);

            });
   }

   changeStatus(status) {
      console.log("CHANGE: ", status);

      this._lessonQuestionSrv.updateLessonQuestion(this.id_lesson, this.question.id_question, status)
         .subscribe(
            (result: any) => {
               this.question.status = status;
               this.toastr.success('El estado de la clase ha sido actualizado correctamente.', 'Acción realizada!');
            },
            error => {
               console.log("error:", error);
            });
   }


   endParticipation(){

   }

}
