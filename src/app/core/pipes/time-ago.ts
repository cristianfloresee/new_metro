//ANGULAR
import { Pipe, PipeTransform } from '@angular/core';
//MOMENT
import * as moment from 'moment';

@Pipe({
   name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

   transform(date) {
      moment.locale('es');
      let date_tmp = moment(date);
      //let date_tmp = moment(date, "DD-MM-YYYY HH:mm").format();

      if (moment().diff(date_tmp, 'minutes') < 60) {
         return moment(date_tmp || new Date().toISOString()).fromNow();
      }
      else if (moment().isSame(date_tmp, 'day')) {
         return moment(date_tmp, moment.ISO_8601).format("HH:mm a");
      }
      else if (moment().diff(date_tmp, 'days') < 7) { //sáb. vie. jue. mie. mar. lun.
         return moment(date_tmp, moment.ISO_8601).format("ddd");
      }
      else {
         return moment(date_tmp, moment.ISO_8601).format("DD MMM");
      }
   }

}
