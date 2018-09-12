import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/constants';

@Injectable({
   providedIn: 'root'
})
export class SessionService {

   constructor(
      public http: HttpClient
   ) {

   }

   login(email, password) {
      return this.http.post(API_URL + '/login', {email, password});
   }

   logout(){

   }
}
