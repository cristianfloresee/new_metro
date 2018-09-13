import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/constants';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class SessionService {

   constructor(
      public http: HttpClient
   ) {

   }

   login(email, password) {

      return this.http.post(API_URL + '/login', { email, password }).pipe(
         map((response: any) => {
            console.log("rr: ", response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return true;
         }))
   }

   logout() {

   }
}
