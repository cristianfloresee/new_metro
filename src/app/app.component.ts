// ANGULAR
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
}
