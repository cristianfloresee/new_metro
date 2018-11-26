//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';

@Injectable()
export class QuestionService {

   constructor(
      public http: HttpClient
   ) { }

   private formatImageForm(id_subcategory, description, difficulty, image) {
      const formData: FormData = new FormData();
      formData.append('id_subcategory', id_subcategory);
      formData.append('description', description);
      formData.append('difficulty', difficulty);
      if (image) formData.append('image', image, image.name);
      return formData;
   }

   createQuestion(id_subcategory, description, difficulty, image) {
      return this.http.post(API.QUESTION_CREATE, this.formatImageForm(id_subcategory, description, difficulty, image))
   }

   getLastQuestionsByTeacherId(id_user) {
      let params = { last_by_teacher: id_user };
      return this.http.get(API.QUESTION_GET, { params });
   }
}
