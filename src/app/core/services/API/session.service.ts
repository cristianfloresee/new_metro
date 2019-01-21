//https://stackoverflow.com/questions/34714462/updating-variable-changes-in-components-from-a-service-with-angular2/34714574
//https://stackoverflow.com/questions/40393703/rxjs-observable-angular-2-on-localstorage-change
//HTTPBACKEND:
// + https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module
// + https://github.com/angular/angular/issues/20203
//INTERCEPTOR CON JWT
// + https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
// Constants
import { API } from '../../../config/constants';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Models
import { User } from '../../models/user.model';
// Services
import { RoleService } from '../role.service';
import { SocketService } from '../socket.service';

@Injectable()
export class SessionService {

   private http: HttpClient;
   token: string;
   menu;

   userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
   user$: Observable<User> = this.userSubject.asObservable();

   private _roleSrv: any;
   constructor(
      public handler: HttpBackend,
      public router: Router,
      //private _roleSrv: RoleService,
      private _socketSrv: SocketService
   ) {

      this.http = new HttpClient(handler);
      this.loadStorage();
      //this._roleSrv.setSessionService(this);
   }

   //
   changeUser(user: User) {
      this.userSubject.next(user);
   }

   setRoleService(service){
      this._roleSrv = service;
   }

   //
   login(email, password) {

      return this.http.post(API.LOGIN, { email, password })
         .pipe(
            map((response: any) => {  //token, user

               // KIRS: CAMBIE EL ORDEN DE LOS 2 DE ABAJO..
               this.saveStorage(response.user, response.token)
               this.changeUser(response.user);

               // Actualiza el array observable de roles disponibles para el usuario logueado
               this._roleSrv.changeAvailableRoles(response.user.roles);

               //this._socketSrv.initSocket();

               let user = {
                  'id_user': response.user.id_user,
                  'username': response.user.username,
                  'role': response.user.roles[0]
               }
               console.log("KRRISSSS: ", user.role);
               // Emite evento para
               this._socketSrv.emit('connectedUser', user)
               return user.role;
            })
         )
   }

   logout() {
      this.router.navigate(['/login']);
      setTimeout(() => {
         //LIMPIA LAS VARIABLES GLOBALES:
         this.token = '';
         this.menu = [];
         this.userSubject.next(null);
         this._roleSrv.cleanRoles();

         // Limpia el locaStorage
         localStorage.removeItem('token');
         localStorage.removeItem('menu');
         localStorage.removeItem('user');

         this._socketSrv.emit('disconnectedUser');

         // Desconecta socket.io (Con el método de Fernando Herrera no se puede hacer de momento)
         this._socketSrv.offSocket();
      }, 1000);

   }

   // Verifica si el usuario ya esta logueado
   // + Si esta logueado debería actualizar datos desde el servidor?
   // + Verificar expiración del token.
   isLogged() {
      //console.log("TOKEN: ", this.token);
      return (this.token.length > 5) ? true : false;
   }

   loadStorage() {

      if (localStorage.getItem('token')) {
         const user = JSON.parse(localStorage.getItem('user'));

         this.token = localStorage.getItem('token');
         this.userSubject.next(user);

         // Emite evento para tener al usuario en la lista de usuarios conectados en el servidor
         // user: {id_user}
         let use = {
            'id_user': user.id_user,
            'username': user.username,
            'role': user.roles[0]
         }
         this._socketSrv.emit('connectedUser', use)
      }
      else {
         this.token = '';
         //this.user = null;
         this.userSubject.next(null);
      }
   }

   saveStorage(user: User, token?: string) {
      console.log(" + saveStorage()")
      //this.changeUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (token) {
         localStorage.setItem('token', token);
         this.token = token;
      }
   }

   socketChangeRole(role){
      console.log("CHANGE ROLE: ", role);
   }


}
