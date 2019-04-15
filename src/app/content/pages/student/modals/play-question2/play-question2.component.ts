// Creo que algunos listeners se pueden reutlizar poniendo un param que indique a que se refiere.

// Angular
import { Component, OnInit, Input, HostListener } from '@angular/core';
// ng-bootstrap
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LessonQuestionService } from 'src/app/core/services/API/lesson-question.service';
import { SessionService } from 'src/app/core/services/API/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'cw-play-question2',
   templateUrl: './play-question2.component.html',
   styleUrls: ['./play-question2.component.scss'],

})
export class PlayQuestion2Component implements OnInit {
   @HostListener('window:beforeunload', ['$event'])
   beforeUnloadHander(event) {
      this.exitToClassSectionRoomAsStudent();
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();
   }

   @Input() class;
   total_participants = 0;

   data_participants = [];


   classQuestionStarted$: Subscription;
   studentSelectedToParticipate$: Subscription;
   studentHasEnteredToTheClassroom$: Subscription;
   studentHasLeftTheClassroom$: Subscription;


   // Pregunta actual que se está jugando
   current_question;
   // Estado del participante
   participant_status;


   counter = 5;

   constructor(
      public activeModal: NgbActiveModal,
      private _classQuestionSrv: LessonQuestionService,
      private _sessionSrv: SessionService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {

      // Emite evento que indica que el estudiante ingreso a la sala.
      this.enterToClassroomAsStudent();

      // Listener que indica que un estudiante entro en la sala.
      this.studentHasEnteredToTheClassroom$ = this._classQuestionSrv.listenStudentHasEnteredToClassroom()
         .subscribe((data: any) => {
            console.log("OPERO: ", typeof (data));

            // Actualiza el estado de un estudiante
            if (data.update_student_status) {
               let index_student = this.data_participants
                  .findIndex((student: any) => student.id_user == data.id_user);
               if (index_student >= 0) this.data_participants[index_student]['participation_status'] = data.update_student_status;


               // Si el estudiante gano
               if (data.update_student_status == 5) {
                  console.log("ESTUDIANTE GANADOR.");
               }
            }
            // + Cuando un estudiante decide participar o algo.
            // + se le envía el user_id como number (ARREGLAR ESTO..)
            // if (typeof (data) === 'string' || typeof(data) === 'number') {
            //    let index_student = this.data_participants
            //    .findIndex((student: any) => student.id_user == data);


            // }
            else {

               // + Cuando un estudiante entra a la sala recibe todos los estudiantes que ya están en la sala.
               // data: { id_class, description, difficulty }
               console.log("SOPA DU MACACO: ", data);
               this.data_participants = data;


               this.total_participants = this.data_participants.length;
            }

         }, (error) => {
            console.log("error: ", error);
            this.toastr.error(`El estado del estudiante ya se ha registrado.`, 'Ha ocurrido un error!');
         });

      // Listener que indica cuando se inicia/detiene una pregunta.
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
               // Si la pregunta finaliza
               else if (data.question.status == 4) {

                  // Finalizando pregunta en 5, 4, 3, 2, 1
                  let _counter = setInterval(() => {
                     this.counter--;
                     if (this.counter == 0) {
                        clearInterval(_counter);
                        this.current_question = null;
                        this.counter = 5;

                        console.log("PARTI: ", this.data_participants);
                        // Establezco el estado de los estudiantes en 1 (en espera) y también lo hago en el servidor
                        this.data_participants.forEach(student => {
                           student.participation_status = 1
                        });
                        console.log("PARTI2: ", this.data_participants);


                     }
                  }, 1000);

               }
            }



            // this.getActivities();
            // 1: no iniciada, 2: iniciada, 3: terminada.
            // if(data.)
            //this.toastr.info(`Ha sido iniciada una pregunta para la asignatura ${data.subject}.`, 'Pregunta Iniciada!');
         });

      // Indica cuando el estudiante es seleccionado para responder.
      // + Le avisa a todos los estudiantes pero en params esta el id del usuario seleccionado.
      this.studentSelectedToParticipate$ = this._classQuestionSrv.listenStudentSelectedToParticipate()
         .subscribe((data: any) => {

            //let id_user = this._sessionSrv.userSubject.value.id_user;
            //console.log("usuario: ", id_user);
            // data: { id_class, description, difficulty }
            console.log("listenStudentSelectedToParticipate(): ", data);

            this.current_question.status = 4;
            let index_student = this.data_participants
               .findIndex((student: any) => student.id_user == data.id_user);
            if (data.id_user == this._sessionSrv.userSubject.value.id_user) {
               this.toastr.success(`Has sido escogido para responder la pregunta.`, 'Escogido para responder!');
            }


            // Asegura que el estudiante este en el array y cambia el estado a 3 (seleccionado para responder)
            if (index_student >= 0) this.data_participants[index_student]['participation_status'] = 3;


         });

      this.studentHasLeftTheClassroom$ = this._classQuestionSrv.listenStudentHasLeftTheClassroom()
         .subscribe((data: any) => {

            // data: { id_class, description, difficulty }
            console.log("Estudiante ha salido: ", data);
            let index_student = this.data_participants
               .findIndex((student: any) => student.id_user == data.student.id_user);

            if (index_student >= 0) this.data_participants.splice(index_student, 1);

         });
   }


   enterToClassroomAsStudent() {
      let user = this._sessionSrv.userSubject.value;
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

   exitToClassSectionRoomAsStudent() {
      let user = this._sessionSrv.userSubject.value;
      this._classQuestionSrv.exitToPlayQuestionSectionRoomAsStudent({ id_class: this.class.id_class, user: user })
   }


   ngOnDestroy() {
      this.exitToClassSectionRoomAsStudent();
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();

      this.studentHasEnteredToTheClassroom$.unsubscribe();
      this.studentHasLeftTheClassroom$.unsubscribe();
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


   // *** Arrgelar
   cancelParticipateOnQuestion(params) {
      console.log("cancelParticipateOnQuestion: ", params);

      // Emit: Estudiante deja de participar en responder la pregunta.
      this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();
      //
      this.participant_status = false;

   }

   // Método si el estudiante desea dejar de ser participante...
   // this.exitToParticipantsToPlayQuestionSectionRoomAsStudent();

}
