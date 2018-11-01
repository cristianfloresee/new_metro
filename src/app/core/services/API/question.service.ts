//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
//RXJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class QuestionService {

   constructor(
      public http: HttpClient
   ) { }


   createQuestion(id_subcategory, description, difficulty) {
      return this.http.post(API.QUESTION_CREATE, { id_subcategory, description, difficulty })
   }

   getLastQuestionsByTeacherId(id_user){
      let params = `?last_by_teacher=${id_user}`;
      return this.http.get(`${API.QUESTION_GET}${params}`)
   }
}
