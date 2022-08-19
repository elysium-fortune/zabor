import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { noOnlyWhitespaceValidator } from "../../../../shared/helpers/custom.validator";
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from "../../../../../environments/environment";
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { VideoProcessingService } from '../../../../shared/services/video-processing.service';
import * as moment from 'moment';
import { dataURLtoFile, dropdownsetting } from "../../../../shared/helpers/commonFunctions";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
declare var $: JQueryStatic;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styles: ['.card{min-height:600px}', '.form-control[readonly]{background-color: #ffffff }']
})
export class VideoComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {

  };
  dtTrigger: Subject<any> = new Subject();

  showAddform: boolean = false;
  advertForm: FormGroup;
  fileUrl: string = "";
  userid: Number = parseInt(localStorage.getItem("currentUserId"));
  restaurantList = [];
  startDate;
  endDate;
  Adverts;
  ButtonTitle: string = "+ New Advert";
  advertId: any = -1;
  videoThumbnail: File = null;
  promoVideo: File = null;
  getVideoWhenEdit: string = "";
  getVideoThumbWhenEdit: string = "";
  popUpVideo: string = "";
  minDate: moment.Moment;


  constructor(public ngxSmartModalService: NgxSmartModalService, private videoService: VideoProcessingService, private _router: Router, private formBuilder: FormBuilder, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    this.minDate = moment();
  }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,

    };
    // stop playing the youtube video when I close the modal
    $('#videoModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', "");
    })


    this.fileUrl = environment.fileurl;
    this.advertForm = this.formBuilder.group({
      restaurant: ["", [Validators.required]],
      dateRange: ["", [Validators.required]],
      video: [null, Validators.required]
    });

    //get restaurant lists of user
    this.spinner.show();
    this.RestaurantService.getrestaurantslist().subscribe(
      data => {
        data.data.map(data => {
          this.restaurantList.push(data);
        });
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast("something went wrong"));
      }
    ).add(() => {
      this.spinner.hide();
    });

    //end Restaurant list

    //get advert list and show them 
    this.spinner.show();
    this.RestaurantService.getpromovideo().subscribe(
      data => {
        if (data.status == true) {
          this.Adverts = data.adverts; 
          this.dtTrigger.next();
        }
        else
          Swal.fire(Swaldata.SwalErrorToast('Unable to get adverts'));
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast('Unable to get adverts'));
      }
    ).add(() => {
      this.spinner.hide();
    })


  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if (file.type != "video/mp4" || (file.size / 1024 / 1024) > 20) {
        Swal.fire(Swaldata.SwalErrorToast("Only allow Mp4 formate and Max size 20 mb"));
        return;
      }
      this.promoVideo = file
      this.videoService.generateThumbnail(file).then(thumbnailData => {
        this.videoThumbnail = dataURLtoFile(thumbnailData, file.name);
      })
    } else {
      this.promoVideo = null;
      this.videoThumbnail = null;
    }
  }


  editad(id) {
    this.resetForm();
    this.ButtonTitle = "+ New Promo Video";
    this.showAddform = true;
    //get advert of id
    this.spinner.show();
    this.RestaurantService.getpromovideobyId(id).subscribe(
      data => {
        this.advertForm.patchValue({
          restaurant: data.response.restaurant_id,
          dateRange: { startDate: moment(data.response.start_date), endDate: moment(data.response.end_date) }
        });
        this.advertId = data.response.id;
        this.getVideoWhenEdit = data.response.video;
        this.getVideoThumbWhenEdit = data.response.video_thumb;
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }
    ).add(() => {
      this.spinner.hide();
    })
  }

  addAd() {
    this.showAddform = false;
    this.resetForm();

  }

  submitAdvert() {
    if (this.advertForm.invalid) {
      return;
    }
    if (this.videoThumbnail == null) {
      Swal.fire(Swaldata.SwalErrorToast("Please choose a promo video "));
      return;
    }

    this.spinner.show();
    if (moment(this.advertForm.value.dateRange.startDate).isValid)
      this.startDate = moment(this.advertForm.value.dateRange.startDate).format('YYYY-MM-DD');

    if (moment(this.advertForm.value.dateRange.endDate).isValid)
      this.endDate = moment(this.advertForm.value.dateRange.endDate).format('YYYY-MM-DD');

    var formData = new FormData();

    //create formdata
    formData.set('restaurant_id', this.advertForm.value.restaurant);
    formData.set('video', this.promoVideo);
    formData.set('start_date', this.startDate);
    formData.set('end_date', this.endDate);
    formData.set('advertId', this.advertId);
    formData.set('video_thumbnail', this.videoThumbnail);
    formData.set('delete_video', this.getVideoWhenEdit);
    formData.set('delete_video_thumb', this.getVideoThumbWhenEdit);

    this.RestaurantService.addpromovideo(formData).subscribe(
      data => {
        if (data.status == true) {
          this.Adverts = data.adverts;

          Swal.fire(Swaldata.SwalSuccessToast(data.msg));
        }
        else
          Swal.fire(Swaldata.SwalErrorToast(data.msg));
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast(error));
        this.spinner.hide();
      }
    ).add(() => {
      this.spinner.hide();
    })
  }

  resetForm() {
    this.advertForm.reset();
    this.startDate = "";
    this.endDate = "";
    this.advertId = -1;
    this.getVideoThumbWhenEdit = "";
    this.getVideoWhenEdit = "";
    this.ButtonTitle = "";
    this.showAddform = false;
  }

  deletead(advert_id) {
    Swal.fire(Swaldata.SwalConfirm("Are You sure?")).then((result) => {
      if (result.value) {
        if (isNaN(advert_id)) {
          Swal.fire(Swaldata.SwalErrorToast('Advert is invalid'));
          return;
        }
        this.spinner.show();
        this.RestaurantService.deletepromovideo(advert_id).subscribe(
          data => {
            if (data.status) {
              this.Adverts.forEach((element, i) => {
                if (element.id == advert_id)
                  this.Adverts.splice(i, 1);
              });

              Swal.fire(Swaldata.SwalSuccessToast('Promotional Video delete succefully'));
            }
            else {
              Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
            }
          },
          error => {
            Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          }
        ).add(() => {
          this.spinner.hide();
        })

      }
    })
  }

  openModel(video) {
    $("#video").attr('src', this.fileUrl + '/' + video + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    (<any>$('#videoModal')).modal('show');
  }

  // Gets the video src from the data-src on each button

  changeStatus(event, id) {
    let status = (event == true) ? 1 : 0;
    let data = { status, id };
    this.spinner.show();
    this.RestaurantService.changepromovideoStatus(data).subscribe(res => {
      if (res.status)
        Swal.fire(Swaldata.SwalSuccessToast(res.msg));
      else
        Swal.fire(Swaldata.SwalErrorToast(res.msg));
    },
      error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }).add(() => {
        this.spinner.hide();
      });
  }






}
