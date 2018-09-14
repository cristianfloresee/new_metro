// ANGULAR
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'cw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('loader_container', [
            state('false', style({ opacity: '0' })),
            state('true', style({ opacity: '0.2' })),
            transition('false => true', animate('300ms ease-in')),
            transition('true => false', animate('600ms ease-in')),
        ]),
        trigger('loader_content', [
            state('false', style({ opacity: '0' })),
            state('true', style({ opacity: '1' })),
            transition('false => true', animate('500ms ease-in')),
            transition('true => false', animate('500ms ease-in')),
        ])
    ]
})
export class AppComponent {
    @ViewChild('cwLoader') cwLoader: ElementRef;

    show_loader: boolean;

    constructor(private loaderSrv: LoaderService) {

    }

    ngOnInit() {
        this.loaderSrv.status.subscribe((status: boolean) => {
            this.show_loader = status;
            if (status) this.cwLoader.nativeElement.style.display = 'block';
            else setTimeout(() => this.cwLoader.nativeElement.style.display = 'none', 600)
        })
    }
}
