// Angular
import { Component, OnInit, Input, ViewChild } from '@angular/core';
// ng-bootstrap
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Services
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { SessionService } from 'src/app/core/services/API/session.service';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// RxJS
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
   @Input() id_lesson;

   // Hace referencia al template 'successSwal'
   @ViewChild('successSwal') private successSwal: SwalComponent;

   SWAL_DELETE_PARTICIPATION = SWAL_DELETE_PARTICIPATION;
   SWAL_SUCCESS_DELETE_PARTICIPATION = SWAL_SUCCESS_DELETE_PARTICIPATION;

   classQuestionStarted$: Subscription;
   studentHasEntered$: Subscription;
   studentHasLeft$: Subscription

   participation_status;

   data_participants = [];

   student_selected;

   winner_student;


   contador_finalizar_pregunta = 7;

   constructor(
      public activeModal: NgbActiveModal,
      private _classQuestionSrv: LessonQuestionService,
      private toastr: ToastrService,
      private _sessionSrv: SessionService
   ) { }

   // Indica si se actualizo el estado de la clase
   update;

   // Estado de la pregunta:
   // + 1: , 2: , 3: , 4:
   question_status: number;

   ngOnInit() {

      console.log("ORIGINAL QUESTION: ", this.question);
      this.enterToPlayQuestionSectionRoomAsTeacher();
      //console.log("QUESTION: ", this.question);
      this.question_status = this.question.status;


      // Profesor escucha la sala en la que entran los estudiantes
      console.log("classQuestionStarted$...")
      this.studentHasEntered$ = this._classQuestionSrv.listenAStudentHasEnteredToParticipate()
         .subscribe((data: any) => {
            // data: { id_class, description, difficulty }
            console.log("JOMBITA: ", data);

            // Como marcar al estudiante seleccionado...
            // { participant_selected: 3, data_participants: [] }
            // if(Array.isArray(data)){
            //    this.data_participants = data;
            // }
            if (data.student_participants) {
               this.data_participants = data.student_participants;
               let index_selected = this.data_participants.findIndex(participant => participant.selected);
               if (index_selected >= 0) this.student_selected = this.data_participants[index_selected];
            }
            else if (data.student_selected) {
               console.log("STUDENT SELECTED: ", data.student_selected);
               this.student_selected = data.student_selected;
            }
            else if (data.new_student_participant) {
               // Revisar si ya existe (ocultando un bug xD)
               let student_exist = this.data_participants.findIndex(student => student.id_user == data.new_student_participant.id_user);

               if (student_exist < 0) {
                  console.log("student_exist: ", student_exist);
                  this.data_participants.push(data.new_student_participant);
               }
            }
            else if (data.cancel_student_selected) {
               console.log("CANCEL STUDENT SELECTED: ", data.cancel_student_selected);
               if (this.student_selected.id_user == data.cancel_student_selected) this.student_selected = null;
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
            let index_student = this.data_participants.findIndex(student => student.id_user == data.student.id_user);
            console.log("INDEX: ", index_student);
            if (index_student >= 0) this.data_participants.splice(index_student, 1);

            if (this.student_selected && data.student.id_user == this.student_selected.id_user) this.student_selected = null;

            //array_all_workspaces.findIndex(subject => subject.id_subject == workspace.id_subject);
            //if (index_found >= 0) array_all_workspaces.splice(index_found, 1);
            console.log("STUDENT SELECTED: ", this.student_selected);
            console.log("STUDENT_PARTICIPANTS: ", this.data_participants);
         });

   }

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

   ngOnDestroy() {
      this.exitToPlayQuestionSectionRoomAsTeacher();
      this.studentHasEntered$.unsubscribe();
      this.studentHasLeft$.unsubscribe();
   }


   // **************
   // + Cambiar estado de la pregunta.
   // + Ocultar los otros participantes y poner los botones respuesta correcta o incorrecta.
   selectStudentToAnswer(student) {

      console.log("selectStudentToAnswer: ", student);

      // Poner la pregunta en estado de que un estudiante fue seleccionado para respodnder.

      // No modificar el question.status.
      //this.question.status = 4;
      console.log("question_status: ", this.question.status);

      // Emite evento
      this._classQuestionSrv.selectStudentToParticipate({
         user: student,
         id_class: this.id_lesson
      });
   }

   cancelStudentSelected() {
      //this.student_selected = null;
      // Emitir evento al servidor
      this._classQuestionSrv.cancelSelectedStudent({
         user: this.student_selected,
         id_class: this.id_lesson
      })
   }



   successAnswer() {
      // Modifico el array de participantes:
      let index_winner = this.data_participants.findIndex(participant => participant.id_user == this.student_selected.id_user);
      if (index_winner >= 0) {
         this.data_participants[index_winner].winner = true;
      }

      console.log("PART: ", this.data_participants);

      // ENVÍO ARRAY DE PARTICIPANTES: [ {id_user, winner, participant:}]
      this.student_selected.status_winner = true;
      this._classQuestionSrv.setStudentParticipationStatus(this.student_selected, this.id_lesson, this.question.id_question)
         .subscribe(
            (result: any) => {


               // HACER ALGO PARA PONER EL ESTADO EN GANADOR
               this.winner_student = true;
               console.log("RESULT: ", result);
               let counter = setInterval(()=> {
                  this.contador_finalizar_pregunta--;
                  if(this.contador_finalizar_pregunta == 0) {
                     clearInterval(counter);

                     //Elimina el objeto estudiante seleccionado.
                     this.student_selected = null;
                     //Finaliza la pregunta.
                     this.updateClassQuestionStatus(4);
                     this.data_participants = null;
                     this.activeModal.close();
                  }
               }, 1000);
               //this.contador_finalizar_pregunta
            },
            error => {
               console.log("error:", error);
            });
   }

   incorrectAnswer() {

      let index_winner = this.data_participants.findIndex(participant => participant.id_user == this.student_selected.id_user);
      if (index_winner >= 0) {
         this.data_participants[index_winner].winner = false;
      }

      this.student_selected.status_winner = false;
      this._classQuestionSrv.setLoserStudent(this.student_selected, this.id_lesson, this.question.id_question)
         .subscribe(
            (result: any) => {

               console.log("RESULT: ", result);

               console.log("winner student: ", this.winner_student);
            },
            error => {
               console.log("error:", error);
            });


   }

   decrementSeconds(){
      this.contador_finalizar_pregunta--;
   }
}
