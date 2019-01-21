// Angular
import { Component, OnInit, Input, ViewChild } from '@angular/core';
// ng-bootstrap
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Services
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
// Constants
import { SWAL_SUCCESS_DELETE_PARTICIPATION, SWAL_DELETE_PARTICIPATION } from 'src/app/config/swal_config';
// ngx-sweetalert2
import { SwalComponent } from '@toverux/ngx-sweetalert2';
@Component({
   selector: 'cw-play-question',
   templateUrl: './play-question.component.html',
   styleUrls: ['./play-question.component.scss']
})
export class PlayQuestionComponent implements OnInit {
   @Input() question;
   @Input() id_lesson;X

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_PARTICIPATION = SWAL_DELETE_PARTICIPATION;
   SWAL_SUCCESS_DELETE_PARTICIPATION = SWAL_SUCCESS_DELETE_PARTICIPATION;

   classQuestionStarted$: Subscription;

   studentHasEntered$: Subscription;
   studentHasLeft$: Subscription


   data_participants = [];

   constructor(
      public activeModal: NgbActiveModal,
      private _classQuestionSrv: LessonQuestionService,
      private socketSrv: SocketService,
      private toastr: ToastrService
   ) { }

   // Indica si se actualizo el estado de la clase
   update;

   question_status: number;

   ngOnInit() {

      this.enterToPlayQuestionSectionRoomAsTeacher();
      //console.log("QUESTION: ", this.question);
      this.question_status = this.question.status;


      // Profesor escucha la sala en la que entran los estudiantes
      console.log("classQuestionStarted$...")
      this.studentHasEntered$ = this._classQuestionSrv.listenAStudentHasEnteredToParticipate()
         .subscribe((data: any) => {
            // data: { id_class, description, difficulty }
            console.log("JOMBITA: ", data);
            if(Array.isArray(data)){
               this.data_participants = data;
            }
            else if(data){
               this.data_participants.push(data.student);
            }

            // this.current_question = data.question;

            // if (this.current_question) {
            //    if (data.question.status == 3) {
            //       // setTimeout(()=>{
            //       //    this.current_question = null;
            //       // }, 10000);
            //    }
            // }

            // this.getActivities();
            // 1: no iniciada, 2: iniciada, 3: terminada.
            // if(data.)
            //this.toastr.info(`Ha sido iniciada una pregunta para la asignatura ${data.subject}.`, 'Pregunta Iniciada!');
         });

         this.studentHasLeft$ = this._classQuestionSrv.listenAStudentHasLeftToParticipate()
         .subscribe((data: any) => {
            // data: { id_class, description, difficulty }
            console.log("JOMBITA SALIO: ", data);

            //this.data_participants.push(data.student);
            // Eliminar al estudiante del array data_participants
            console.log("DATA: ", data.student.id_user);
            console.log("DATA PARTICIPANTS: ", this.data_participants);
            let index_student = this.data_participants.findIndex(student => student.id_user == data.student.id_user);
            console.log("INDEX: ", index_student);
            if(index_student >= 0) this.data_participants.splice(index_student, 1);

            //array_all_workspaces.findIndex(subject => subject.id_subject == workspace.id_subject);
            //if (index_found >= 0) array_all_workspaces.splice(index_found, 1);

         });

   }




   /*
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
   }*/

   updateClassQuestionStatus(status) {
      console.log("CHANGE: ", status);

      // Revisar que no halla otra pregunta iniciada (hacerlo en el lado del servidor)


      this._classQuestionSrv.updateLessonQuestion(this.id_lesson, this.question.id_question, status)
         .subscribe(
            (result: any) => {

               if (!result) {
                  this.toastr.error('Asegúrate de no tener otra pregunta iniciada.', 'Ha ocurrido un error!');
               }
               else {
                  this.question.status = status;
                  this.toastr.success('El estado de la clase ha sido actualizado correctamente.', 'Acción realizada!');
               }
            },
            error => {
               console.log("error:", error);
            });
   }


   endParticipation() {

   }

   enterToPlayQuestionSectionRoomAsTeacher() {
      // id_course para obtener otras preguntas iniciadas en el curso
      this._classQuestionSrv.enterToPlayQuestionSectionRoomAsTeacher({
         id_class: this.id_lesson,
         //id_module: this.class.id_module
      })
   }

   exitToPlayQuestionSectionRoomAsTeacher() {
      this._classQuestionSrv.exitToPlayQuestionSectionRoomAsTeacher({ id_class: this.id_lesson })
   }

   ngOnDestroy(){
      this.exitToPlayQuestionSectionRoomAsTeacher();
      this.studentHasEntered$.unsubscribe();
      this.studentHasLeft$.unsubscribe();
   }

   selectStudentToAnswer(student){
      console.log("selectStudentToAnswer: ", student);

      // Emite evento
      this._classQuestionSrv.selectStudentToParticipate(student);
   }
}
