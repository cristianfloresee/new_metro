// Angular
import { Component, OnInit, Input, HostListener } from '@angular/core';
// ng-bootstrap
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { SessionService } from 'src/app/core/services/API/session.service';

@Component({
   selector: 'cw-play-question2',
   templateUrl: './play-question2.component.html',
   styleUrls: ['./play-question2.component.scss'],

})
export class PlayQuestion2Component implements OnInit {
   @HostListener('window:beforeunload', ['$event'])
   beforeUnloadHander(event) {
      this.exitToActivitySectionRoomAsStudent();
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();
   }

   @Input() class;
   total_participants = 0;

   data_participants = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


   classQuestionStarted$: Subscription;
   studentSelectedToParticipate$: Subscription;
   studentHasEnteredToTheClassroom$: Subscription;


   // Pregunta actual que se está jugando
   current_question;
   // Estado del participante
   participant_status;

   constructor(
      public activeModal: NgbActiveModal,
      private _classQuestionSrv: LessonQuestionService,
      private _sessionSrv: SessionService
   ) { }

   ngOnInit() {

      // Emite evento que indica que el estudiante ingreso a la sala.
      this.enterToPlayQuestionSectionRoomAsStudent();

      this.studentHasEnteredToTheClassroom$ = this._classQuestionSrv.listenStudentHasEnteredToClassroom()
         .subscribe((data: any) => {

            // data: { id_class, description, difficulty }
            console.log("Estudiante en sala: ", data);
         });

      // Listener que indica cuando se inicia una pregunta
      this.classQuestionStarted$ = this._classQuestionSrv.listenPlayingTheClassQuestion()
         .subscribe((data: any) => {

            // data: { id_class, description, difficulty }
            console.log("JOMBA: ", data);
            this.current_question = data.question;

            if (this.current_question) {
               if (data.question.status == 3) {
                  // setTimeout(()=>{
                  //    this.current_question = null;
                  // }, 10000);
               }
            }

            // this.getActivities();
            // 1: no iniciada, 2: iniciada, 3: terminada.
            // if(data.)
            //this.toastr.info(`Ha sido iniciada una pregunta para la asignatura ${data.subject}.`, 'Pregunta Iniciada!');
         });

      // Indica cuando el estudiante es seleccionado para responder
      this.studentSelectedToParticipate$ = this._classQuestionSrv.listenStudentSelectedToParticipate()
         .subscribe((data: any) => {

            // data: { id_class, description, difficulty }
            console.log("Estudiante seleccionado: ", data);


         });
   }


   enterToPlayQuestionSectionRoomAsStudent() {
      let user = this._sessionSrv.userSubject.value
      console.log("enterToPlayQuestionSectionRoomAsStudent()");
      // id_course para obtener otras preguntas iniciadas en el curso
      this._classQuestionSrv.enterToPlayQuestionSectionRoomAsStudent({
         id_class: this.class.id_class,
         id_module: this.class.id_module,
         user: user
      })
   }

   enterToParticipantsToPlayQuestionSectionRoomAsStudent() {
      let user = this._sessionSrv.userSubject.value
      console.log("enterToParticipantsToPlayQuestionSectionRoomAsStudent()");
      // id_course para obtener otras preguntas iniciadas en el curso
      this._classQuestionSrv.enterToParticipantsToPlayQuestionSectionRoomAsStudent({
         id_class: this.class.id_class,
         id_module: this.class.id_module,
         user: user
      });

      this.participant_status = true;
   }



   exitToParticipantsToPlayQuestionSectionRoomAsStudent() {
      let user = this._sessionSrv.userSubject.value;

      this._classQuestionSrv.exitToParticipantsToPlayQuestionSectionRoomAsStudent({
         id_class: this.class.id_class,
         user: user
      });
   }

   exitToActivitySectionRoomAsStudent() {
      this._classQuestionSrv.exitToPlayQuestionSectionRoomAsStudent({ id_class: this.class.id_class })
   }

   ngOnDestroy() {
      this.exitToActivitySectionRoomAsStudent();
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();
      this.studentHasEnteredToTheClassroom$.unsubscribe();
      this.studentSelectedToParticipate$.unsubscribe();
      this.classQuestionStarted$.unsubscribe();
      console.log("ON DESTROYY..............");
   }

   participateOnQuestion(params) {

      this.enterToParticipantsToPlayQuestionSectionRoomAsStudent();
      let user = this._sessionSrv.userSubject.value.id_user;
      console.log("USER: ", user);
      // id_user, id_question, algo mas'???
      console.log("QUESTION: ", params);
   }

   cancelParticipateOnQuestion(params) {
      console.log("cancelParticipateOnQuestion: ", params);
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();
      this.participant_status = false;
   }

   // Método si el estudiante desea dejar de ser participante...
   // this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();

}
