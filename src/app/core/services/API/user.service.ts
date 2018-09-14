import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/constants';

@Injectable({
   providedIn: 'root'
})
export class UserService {

   constructor(
      public http: HttpClient
   ) {

   }

   createUser(user) {
      const { name, last_name, middle_name, document_no, email, phone_no, username, password } = user;
      return this.http.post(API_URL + '/users/create', { name, last_name, middle_name, document_no, email, phone_no, username, password });
   }


}
