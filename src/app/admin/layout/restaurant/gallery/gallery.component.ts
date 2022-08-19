import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile, dropdownsetting } from "./../../../../shared/helpers/commonFunctions";
import Swal from 'sweetalert2';
import * as Swaldata from './../../../../shared/helpers/swalFunctionsData';
import { RestaurantService } from "../../../../shared/services/restaurant.service";
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @ViewChild('fileselector', { static: false }) fileselector: ElementRef<HTMLElement>;

  public fileurl: string = environment.fileurl;
  public res_id: number = parseInt(this.route.snapshot.paramMap.get("id"));
  public token: string = localStorage.getItem('token');
  private _album: Array<any> = [];

  public galleryImages: Array<any> = [];


  constructor(private _lightbox: Lightbox, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.res_id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.spinner.show();
    this.RestaurantService.getGalleryImage(this.res_id).subscribe(
      data => {
        this.galleryImages = data.response;
        data.response.forEach(element => {
          let album = {
            src: this.fileurl + '/' + element.image
          }
          this._album.push(album);
        });
      },
      error => {

      }
    ).add(() => {
      this.spinner.hide();
    })
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }


}
