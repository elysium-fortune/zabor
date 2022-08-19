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
import * as moment from 'moment';
import { dataURLtoFile, dropdownsetting } from "../../../../shared/helpers/commonFunctions";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styles: ['.card{min-height:600px}', '.form-control[readonly]{background-color: #ffffff }', '#advert-image{width:100%}', 'td img{cursor: pointer;}', '.modal-content{border:none}']
})
export class AdvertComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  showAddform: boolean = false;
  advertForm: FormGroup;
  fileUrl: string = "";
  userid: Number = parseInt(localStorage.getItem("currentUserId"));
  restaurantList = [];
  dataURLtoFile = dataURLtoFile;
  showImagecropper: boolean = false;
  uploadedAdvertImage: any = "";
  startDate;
  endDate;
  Adverts;
  promoAdImage = "";
  ButtonTitle: string = "+ New Advert";
  advertId: any = -1
  minDate: moment.Moment;

  pic_url = environment.fileurl + '/';


  constructor(private _router: Router, private formBuilder: FormBuilder, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    this.minDate = moment();
  }

  ngOnInit() {
    this.fileUrl = environment.fileurl;
    this.advertForm = this.formBuilder.group({
      restaurant: ["", [Validators.required]],
      dateRange: ["", [Validators.required]]
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
    this.RestaurantService.getadvert().subscribe(
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

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any, field): void {
    this.showImagecropper = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.uploadedAdvertImage = this.dataURLtoFile(event.base64, this.imageChangedEvent.target.files[0].name);
  }

  editad(id) {
    this.showAddform = true;
    this.ButtonTitle = "+ New Advert"
    //get advert of id
    this.spinner.show();
    this.RestaurantService.getadvertbyId(id).subscribe(
      data => {
        this.resetForm();
        this.advertForm.patchValue({
          restaurant: data.response.restaurant_id,
          dateRange: { startDate: moment(data.response.start_date), endDate: moment(data.response.end_date) }
        });
        this.promoAdImage = this.fileUrl + "/" + data.response.pic;
        this.advertId = data.response.id

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
    this.promoAdImage = "";

  }

  submitAdvert() {
    if (this.advertForm.invalid) {
      return;
    }

    if (this.uploadedAdvertImage == "" && this.advertId == -1) {
      Swal.fire(Swaldata.SwalErrorToast('Please select advert image'));
      return false;
    }

    this.spinner.show();
    if (moment(this.advertForm.value.dateRange.startDate).isValid)
      this.startDate = moment(this.advertForm.value.dateRange.startDate).format('YYYY-MM-DD');

    if (moment(this.advertForm.value.dateRange.endDate).isValid)
      this.endDate = moment(this.advertForm.value.dateRange.endDate).format('YYYY-MM-DD');

    var formData = new FormData();
    formData.set('restaurant_id', this.advertForm.value.restaurant);
    formData.set('start_date', this.startDate);
    formData.set('end_date', this.endDate);
    formData.set('advertPic', this.uploadedAdvertImage);
    formData.set('advertId', this.advertId);

    this.RestaurantService.addAdvert(formData).subscribe(
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
      this.resetForm();
      this.spinner.hide();
    })
  }

  resetForm() {
    this.advertForm.reset();
    this.startDate = "";
    this.endDate = "";
    this.uploadedAdvertImage = "";
    this.showImagecropper = false;
    this.advertId = -1;
    this.promoAdImage = ""
  }

  deletead(advert_id) {
    Swal.fire(Swaldata.SwalConfirm("Are You sure?")).then((result) => {
      if (result.value) {
        if (isNaN(advert_id)) {
          Swal.fire(Swaldata.SwalErrorToast('Advert is invalid'));
          return;
        }
        this.spinner.show();
        this.RestaurantService.deleteAdvert(advert_id).subscribe(
          data => {
            if (data.status) {
              this.Adverts.forEach((element, i) => {
                if (element.id == advert_id)
                  this.Adverts.splice(i, 1);
              });


              Swal.fire(Swaldata.SwalSuccessToast('Advert deleted succefully'));
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

  changeStatus(event, id) {
    let status = (event == true) ? 1 : 0;
    let data = { status, id };
    this.spinner.show();
    this.RestaurantService.changeadvertStatus(data).subscribe(res => {
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

  openModel(imgsrc) {
    $("#advert-image").attr('src', imgsrc);
    (<any>$('#advertModal')).modal('show');
  }
}
