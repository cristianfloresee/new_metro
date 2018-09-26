//https://stackoverflow.com/questions/34714462/updating-variable-changes-in-components-from-a-service-with-angular2/34714574
//https://stackoverflow.com/questions/40393703/rxjs-observable-angular-2-on-localstorage-change
//HTTPBACKEND:
// + https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module
// + https://github.com/angular/angular/issues/20203
//INTERCEPTOR CON JWT
// + https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
//CONSTANTES
import { API } from '../../../config/constants';
//RXJS
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//MODELOS
import { User } from '../../models/user.model';

@Injectable()
export class SessionService {

   private http: HttpClient;
   token: string;
   menu;
   userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
   user$: Observable<User> = this.userSubject.asObservable();

   constructor(
      public handler: HttpBackend,
      public router: Router
   ) {
      this.http = new HttpClient(handler);
      this.loadStorage();
   }

   changeUser(user: User) {
      this.userSubject.next(user);
   }

   login(email, password) {

      return this.http.post(API.LOGIN, { email, password })
         .pipe(
            map((response: any) => {
               this.saveStorage(response.user, response.token)
               return true;
            })
         )
   }

   logout() {
      this.router.navigate(['/login']);
      setTimeout(() => {
         this.token = '';
         this.menu = [];
         this.userSubject.next(null);
         localStorage.removeItem('token');
         localStorage.removeItem('menu');
         localStorage.removeItem('user');
      }, 1000);

   }

   //VERIFICAR LA EXP DEL TOKEN: POR HACER...
   isLogged() {
      return (this.token.length > 5) ? true : false;
   }

   loadStorage() {
      if (localStorage.getItem('token')) {
         this.token = localStorage.getItem('token');
         this.userSubject.next(JSON.parse(localStorage.getItem('user')));
      }
      else {
         this.token = '';
         //this.user = null;
         this.userSubject.next(null);
      }
   }

   saveStorage(user: User, token?: string) {
      this.changeUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (token) {
         localStorage.setItem('token', token);
         this.token = token;
      }
   }


}
