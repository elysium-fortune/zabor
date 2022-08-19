import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private spinner: NgxSpinnerService) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['title']) {
                        return child.snapshot.data['title'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        ).subscribe((data: any) => {
            if (data) {
                this.titleService.setTitle(data + ' - Zabor');
            }
        });

        this.router.events.subscribe((e) => {
            this.navigationInterceptor(e);
        })
    }


    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event): void {
        if (event instanceof NavigationStart) {
            this.spinner.show()
        }
        if (event instanceof NavigationEnd) {
            window.scroll(0, 0)
            this.spinner.hide()
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.spinner.hide()
        }
        if (event instanceof NavigationError) {
            this.spinner.hide()
        }
    }

    ngOnInit() {
    }

}
