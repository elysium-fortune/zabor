import { Component, OnInit } from '@angular/core';
import { UserService } from './.././../../../shared/services/frontServices/user.service';
import { TranslationService } from './.././../../../shared/services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public site: any;
  public webdata: any;
  constructor(public translation: TranslationService, private userservice: UserService) { }

  ngOnInit() {

    //get website info 
    this.userservice.getSiteInfo().subscribe(
      data => {

        if (data.status) {
          this.site = data.data
          this.webdata = data.webdata

        }
      },
      err => {
      }
    )
  }

}
