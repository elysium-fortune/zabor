import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile, dropdownsetting } from "../../../../shared/helpers/commonFunctions";
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
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
  public loggedInUser_Id = localStorage.getItem("currentUserId");
  public url: string = environment.apiUrl + "/user/gallaryImage?loggedInUser_Id=" + this.loggedInUser_Id + "&res_id=" + this.res_id;
  public resetVar = false;

  private _album: Array<any> = [];

  public galleryImages: Array<any> = [];

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: 2,
    uploadAPI: {
      url: this.url,
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    },

    hideProgressBar: false,
  };

  constructor(private _lightbox: Lightbox, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

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


  buttonclick() {
    let el: HTMLElement = this.fileselector.nativeElement;
    el.click();
  }

  DocUpload(event) {
    let response = JSON.parse(event.response);
    if (response.status) {
      Swal.fire(Swaldata.SwalSuccessToast(response.msg));
      this.galleryImages = response.data;
      response.data.forEach(element => {
        let album = {
          src: this.fileurl + '/' + element.image
        }
        this._album.push(album);
      });
    }
    this.resetVar = true;
  }

  deleteImage(id, index, img_path) {

    this.spinner.show();
    this.RestaurantService.deletegalleryimage(id, this.res_id, img_path).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
          this.galleryImages.splice(index, 1);
          this._album.splice(index, 1);
        } else
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
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
