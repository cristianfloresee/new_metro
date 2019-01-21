//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RXJS
import { Observable } from 'rxjs';
//SOCKET
import * as io from 'socket.io-client';
// Opción 2
import { Socket } from 'ngx-socket-io'
//CONSTANTES
import { API_URL } from '../../config/constants';

//EMITERS: this.socket.emit('sendMessage', { message: msg });
//HANDLERS: this.socket.on('newMessage', msg => observer.next(msg) );


@Injectable()
export class SocketService {

   // Opción 2 (check_status)
   socket_status = false;
   // Opción 1
   //private socket;

   constructor(
      //private client: HttpClient,
      private socket: Socket
   ) { }

   // PENDIENTES!!!!
   // Inicia la conexión del Web Socket
   public initSocket() {
      console.log("INICIA EL WEBSOCKET...")
      //this.socket = io(API_URL);
      this.socket.connect()
   }


   // Cierra la conexión de socket.io (no funciona con el método de Fernando Herrera)
   public offSocket() {
      console.log("DESCONECTA EL SOCKET...")

      this.socket.emit('logout');

      // Solucionar lo de abajo
      //if (this.socket) this.socket.disconnect();
   }

   checkStatus() {
      this.socket.on('connect', () => {
         console.log('connected to server');
         this.socket_status = true;
      });

      this.socket.on('disconnect', () => {
         console.log('disconnected to server');
         this.socket_status = false;
      });
   }




   // Escucha cambios sobre el evento 'change_users'
   /*public onUsers(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_users', (data) => observer.next(data))
      })
   }*/

   // Escucha cambios sobre el evento 'change_subjects'
   /*public onSubjects(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_subjects', (data) => observer.next(data))
      })
   }*/

   /*
   public onCreateEnrollment(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('create_enrollment', (data) => observer.next(data))
      })
   }*/

   emit(event: string, payload?: any, callback?: Function) {
      this.socket.emit(event, payload, callback);
   }

   listen(event: string) {
      return this.socket.fromEvent(event)
   }

   /* Servicio HTTP Simple
   public getMatriculas(): Promise<any> {
      return this.client
         .get<any>(`${API_URL}/api/matriculas`)
         .toPromise()
         .then((response) => {
            return response;
         })
         .catch(this.handleError);
   }*/

   // Manejador de errores
   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
   }
}
