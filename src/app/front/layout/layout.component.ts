import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styles: []
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor(private router: Router) { }

    ngOnInit() {
        $('body').removeClass('nonepadding');
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
