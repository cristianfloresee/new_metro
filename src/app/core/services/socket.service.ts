//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

   constructor(private client: HttpClient) {
      this.socket = io(API_URL);
   }

   public getMatriculas(): Promise<any> {
      return this.client
         .get<any>(`${API_URL}/api/matriculas`)
         .toPromise()
         .then((response) => {
            return response;
         })
         .catch(this.handleError);
   }




   public onChange(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_matriculas', (data) => observer.next(data));
      });
   }

   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
   }
}
