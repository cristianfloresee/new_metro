import { Injectable, } from '@angular/core';

@Injectable()
export class utilService {

   formatMenu(menu) {
      let new_data = menu.reduce((object, item) => {
         object[item.subject] = object[item.subject] || [];
         object[item.subject].push(item);
         return object;
      }, {})
      new_data = Object.keys(new_data).map(key => {
         let years = this.groupByYears(new_data[key])
         return { subject: key, years: years }
      })
      return new_data;
   }

   private groupByYears(data) {
      let round1 = JSON.parse(JSON.stringify(data));
      round1 = round1.reduce((object, item) => {
         object[item.year] = object[item.year] || [];
         object[item.year].push(item);
         return object;
      }, {})

      let round2 = Object.keys(round1).map(key => {
         let semesters = this.groupBySemesters(round1[key]);
         return { year: key, semesters: semesters }
      })
      return round2;
   }

   private groupBySemesters(data) {
      let round1 = JSON.parse(JSON.stringify(data));
      round1 = round1.reduce((object, item) => {
         object[item.semester] = object[item.semester] || [];
         object[item.semester].push(item);
         return object;
      }, {});

      let round2 = Object.keys(round1).map(key => {
         return { semester: key, courses: round1[key] }
      })
      return round2;
   }
}
