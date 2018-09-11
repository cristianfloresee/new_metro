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
      console.log("funcion login del service...");
      let url = API_URL;
      return this.http.post(url + 'login', {email, password});
   }

   logout(){

   }
}
