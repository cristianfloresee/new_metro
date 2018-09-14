import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/constants';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class SessionService {

   token;
   user;

   constructor(
      public http: HttpClient,
      public router: Router
   ) {
      this.loadStorage();
   }

   login(email, password) {

      return this.http.post(API_URL + '/login', { email, password }).pipe(
         map((response: any) => {
            let user = JSON.stringify(response.user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', user);
            this.token = response.token;
            this.user = user;
            return true;
         }))
   }

   logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
   }

   isLogged() {
      return (this.token.length > 5) ? true : false;
   }

   loadStorage() {
      if (localStorage.getItem('token')) {
         this.token = localStorage.getItem('token');
         this.user = JSON.parse(localStorage.getItem('user'));
      }
      else {
         this.token = '';
         this.user = null;
      }
   }
}
