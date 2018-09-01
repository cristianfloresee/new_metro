import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
   selector: 'cw-footer',
   templateUrl: './footer.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
   @HostBinding('class') classes = 'm-grid__item m-footer';

   constructor() { }

   ngOnInit(): void {}

}
