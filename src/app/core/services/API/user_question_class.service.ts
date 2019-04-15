// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Constants
import { API } from '../../../config/constants';

@Injectable()
export class UserQuestionClassService {

   constructor(
      public http: HttpClient,
   ) { }

   // params: { id_question, id_class }
   getStudentAssistants(params) {
      return this.http.get(API.USER_QUESTION_CLASS, { params });
   }

}
