import { Component, OnInit, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/core/services/API/enrollments.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from 'src/app/core/services/API/activity.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_SUCCESS_UPDATE_WINNERS, TOAST_ERROR_UPDATE_WINNERS } from 'src/app/config/toastr_config';
import { ActivityParticipationService } from 'src/app/core/services/API/activity_participation.service';
import { UserQuestionClassService } from 'src/app/core/services/API/user_question_class.service';

@Component({
   selector: 'cw-winners',
   templateUrl: './winners.component.html',
   styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
   @Input() id_course;
   @Input() activity;
   @Input() id_class;
   @Input() question;

   data_students;

   winner_status_request = [];

   total_winners = 0;

   add_winners = [];
   delete_winners = [];

   constructor(
      private ngModal: NgbModal,
      public activeModal: NgbActiveModal,
      private _enrollmentSrv: EnrollmentService,
      private _activitySrv: ActivityService,
      private toastr: ToastrService,
      private _activityParticipationsSrv: ActivityParticipationService,
      private _userQuestionClassSrv: UserQuestionClassService

   ) { }

   ngOnInit() {
      console.log("ID COURSE: ", this.id_course);
      console.log("ACTIVITY: ", this.activity);
      this.getStudents();

   }


   // En vez de obtener las inscripciones
   // necesito obtener los ganadores de la actividad
   getStudents() {

      if (this.activity) {
         this._activitySrv.getStudentsByActivityID(this.activity.id_activity)
            .subscribe(
               result => {
                  console.log("students: ", result);
                  // Formatea el array de estudiantes con un campo 'original_status' que contendrá el estado original ganador/perdedor

                  this.data_students = this.formatActivityParticipationArray(result);
                  console.log("participacion formateada: ", this.data_students);
                  this.getTotalWinners(this.data_students);
               },
               error => {
                  console.log("error:", error);
               });
      }
      else if (this.question) {
         let params = {
            id_question: this.question.id_question,
            id_class: this.id_class
         };
         this._userQuestionClassSrv.getStudentAssistants(params)
            .subscribe(
               result => {
                  console.log("students: ", result);
                  // Formatea el array de estudiantes con un campo 'original_status' que contendrá el estado original ganador/perdedor
                  this.data_students = this.formatActivityParticipationArray(result);
                  //console.log("participacion formateada: ", this.data_students);
                  this.getTotalWinners(this.data_students);
               },
               error => {
                  console.log("error:", error);
               });
      }

   }

   // Crea un estado original para cada registro.
   formatActivityParticipationArray(activity_participation) {
      activity_participation.forEach(participation => {
         participation.original_status = participation.status;
      });
      return activity_participation;
   }

   getTotalWinners(array) {
      this.total_winners = 0;
      array.forEach(item => {
         if (item.status == 2) this.total_winners++;
         console.log("TOTAL WINNERS: ", this.total_winners);
      })
   }

   // Status: 1:
   changeStudentStatus(student) {
      console.log("student: ", student);
      // Cambia el estado añadido/no añadido
      if (student.status == 1) student.status = 2;
      else student.status = 1;

      // Si el nuevo estado 'added' (añadida/no añadida) es diferente al estado original 'original_added'
      // Si es un nuevo estado entonces debo insertar una petición
      if (student.status != student.original_status) {
         // Si ya estaba añadido entonces corresponde a una eliminación
         if (student.original_status == 2) this.delete_winners.push(student.id_user);
         else this.add_winners.push(student.id_user);
      } else {
         //
         if (student.status == 2) this.deleteFromArray(student.id_user, this.delete_winners);
         else this.deleteFromArray(student.id_user, this.add_winners);
         // Elimina el cambio de estado en el array de peticiones
      }
      console.log("add_question: ", this.add_winners);
      console.log("delete_question: ", this.delete_winners);
   }

   changeWinnerStatus(participation) {
      // Cambia el estado ganador/perdedor
      console.log("PARTICIPATION: ", participation);
      if (participation.status == 1) participation.status = 2;
      else participation.status = 1;

      // Si el nuevo estado 'status' (ganador/perdedor) es diferente al estado original 'original_status'
      if (participation.status != participation.original_status) {
         // Inserta el cambio de estado el el array de peticiones
         this.insertWinnerStatusRequest(participation.id_user, participation.status)
      } else {
         // Elimina el cambio de estado en el array de peticiones
         this.deleteWinnerStatusRequest(participation.id_user)
      }
      this.getTotalWinners(this.data_students);
   }

   insertWinnerStatusRequest(id_user, status) {
      this.winner_status_request.push({ id_user, status });
      console.log("winner: ", this.winner_status_request);
   }

   deleteWinnerStatusRequest(id_user) {
      // Busco el indice de la solicitud en el array de Solicitudes
      let index = this.winner_status_request.map(i => i.id_user).indexOf(id_user);
      // Elimino la solicitud
      this.winner_status_request.splice(index, 1);
      console.log("winner: ", this.winner_status_request);
   }

   deleteFromArray(id, array) {
      // Busco el indice de la solicitud en el array de Solicitudes
      let index = array.indexOf(id);
      // Elimino la solicitud
      array.splice(index, 1);
   }

   updateWinners() {
      this._activityParticipationsSrv.updateActivityParticipations(this.activity.id_activity, this.winner_status_request)
         .subscribe(
            result => {
               this.activeModal.close(true);
               this.toastr.success(TOAST_SUCCESS_UPDATE_WINNERS.message, TOAST_SUCCESS_UPDATE_WINNERS.title);
            },
            error => {
               this.toastr.error(TOAST_ERROR_UPDATE_WINNERS.message, TOAST_ERROR_UPDATE_WINNERS.title);
               console.log("error:", error);
            });
   }

}
