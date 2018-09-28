//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RXJS
import { Observable } from 'rxjs';
//SOCKET
import * as io from 'socket.io-client';
//CONSTANTES
import { API_URL } from '../../config/constants';

//EMITERS: this.socket.emit('sendMessage', { message: msg });
//HANDLERS: this.socket.on('newMessage', msg => observer.next(msg) );


@Injectable()
export class SocketService {

   private socket;

   constructor(private client: HttpClient) { }

   //INICIA LA CONEXIÓN SI ES QUE TIENE ROL ADMIN, TEACHER O STUDENT
   public initSocket() {
      this.socket = io(API_URL);
   }

   //CIERA LA CONEXIÓN CUANDO HACE LOGOUT
   public offSocket() {
      this.socket.disconnect();
   }



   public onUsers(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_users', (data) => observer.next(data))
      })
   }

   public onSubjects(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_subjects', (data) => observer.next(data))
      })
   }


   /**BORRAR?' */
   public getMatriculas(): Promise<any> {
      return this.client
         .get<any>(`${API_URL}/api/matriculas`)
         .toPromise()
         .then((response) => {
            return response;
         })
         .catch(this.handleError);
   }

   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
   }
}
