import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'cw-notification',
   templateUrl: './notification.component.html',
   styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

   animateShake: any;
   animateBlink: any;

   constructor() {

      //ANIMACIÓN DE SACUDIDA PARA EL ICONO Y PARPADEO DE LA NOTIFICACIÓN
      //ESTO SE PUEDE HACER DIRECTAMENTE EN CSS
      setInterval(() => {
         this.animateShake = 'm-animate-shake';
         this.animateBlink = 'm-animate-blink';
      }, 3000);
      setInterval(() => (this.animateShake = this.animateBlink = ''), 6000);
   }

   ngOnInit() {}

}
