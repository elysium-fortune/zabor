import { Component, NgZone, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RestaurantService } from "../../../../shared/services/restaurant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { noOnlyWhitespaceValidator } from "../../../../shared/helpers/custom.validator";
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile, dropdownsetting, cleanForm, cityLists } from "../../../../shared/helpers/commonFunctions";
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
declare var $: JQueryStatic;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: ['agm-map { height: 400px}', '.form-control[readonly]{background-color: #ffffff }', '.restaurantImage{ margin : 20px 0px}', '.profile-pic-div{ width: 100px; height: 100px; border: 1px gray solid;}'],
  styleUrls: ['../restaurant.component.scss']
})
export class CreateComponent implements OnInit {
  restaurantForm: FormGroup;
  openTimeForm: FormGroup;
  openTimeFormvalue: any = null

  imagepath: string = "";
  private file: File | null = null;
  restaurantImage: string = "";
  dataURLtoFile = dataURLtoFile;
  showImagecropper: Boolean = false;
  UserID: string | Blob;
  Categories: [];
  cat_id: number;
  subcategories: any = [];


  selectedSubcats = [];
  dropdownSettings = dropdownsetting;
  subcategoriesName: string;

  public lat: any = -1;
  public lng: any = -1;
  public zoom: any = -1;
  public searchControl: FormControl;

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;
  public cityList: any = cityLists;


  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _router: Router, private formBuilder: FormBuilder, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {

  }

  chooseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': { lat: this.lat, lng: this.lng } }, (results) => {
      if (results[0]) {
        this.searchElementRef.nativeElement.value = results[0].formatted_address

      }
    });
  }

  setLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          let geocoder = new google.maps.Geocoder;
          geocoder.geocode({ 'location': { lat: this.lat, lng: this.lng } }, (results) => {
            if (results[0]) {
              this.searchElementRef.nativeElement.value = results[0].formatted_address
            }
          });

        },
      );

    };
  }
  ngOnInit() {
    this.zoom = 12;
    //create search FormControl
    this.searchControl = new FormControl();



    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      this.setLocation()
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.zoom = 15
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

        });
      });
    });

    this.restaurantForm = this.formBuilder.group({
      name: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(60)]],
      email: ["", [Validators.required, Validators.email]],
      description: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
      descriptiones: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
      address: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
      status: [1, [Validators.required]],
      restaurantpic: [null, Validators.required],
      category: ["", [Validators.required]],
      subcategory: [null, []],
      city: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(25)]],
      contact: ["", [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9\+\-\]+'), Validators.minLength(10)]],
      website: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      avaragecost: ["", [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]+')]],
      cod: [1, [Validators.required]],
      min_order_value: ['', [Validators.required, Validators.min(0), Validators.pattern("[0-9+-]+")]],
      max_order_value: ['', [Validators.required, Validators.min(0), Validators.pattern("[0-9+-]+")]],
      cancel_charge: [5, [Validators.required, Validators.max(100), Validators.pattern("[0-9+-]+")]]
    });

    this.openTimeForm = this.formBuilder.group({
      monopen_time: [''],
      monclose_time: [''],
      tueopen_time: [''],
      tueclose_time: [''],
      wedopen_time: [''],
      wedclose_time: [''],
      thuopen_time: [''],
      thuclose_time: [''],
      friopen_time: [''],
      friclose_time: [''],
      satopen_time: [''],
      satclose_time: [''],
      sunopen_time: [''],
      sunclose_time: [''],
    })
    //get current user 
    this.UserID = localStorage.getItem('currentUserId');

    this.spinner.show();
    //get categories of restaurant
    this.RestaurantService.getcategoriesofRestaurent().subscribe(
      data => {
        this.Categories = data.data;
        this.spinner.hide();
      }, error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
        this._router.navigate(['/owner/restaurants']);
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

    this.restaurantForm.patchValue({
      restaurantpic: this.dataURLtoFile(event.base64, this.imageChangedEvent.target.files[0].name)
    });

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  getSubcat() {
    this.subcategories = this.selectedSubcats = [];
    this.spinner.show();
    this.cat_id = parseInt(this.restaurantForm.value.category);
    this.RestaurantService.getsubcategory(this.cat_id).subscribe(data => {
      if (data.status == 200) {
        data.subcategories.map(subcat => {
          this.subcategories.push({ "id": subcat.id, "itemName": subcat.name })
        })
        this.selectedSubcats = [];
      }
      else
        Swal.fire(Swaldata.SwalErrorToast(data.msg));
    }, error => {
      Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      this._router.navigate(['/owner/restaurants']);
    }).add(() => {
      this.spinner.hide();
    })

  }

  onSubmit() {
    this.subcategoriesName = "";
    if (this.restaurantForm.invalid) {
      return;
    }

    cleanForm(this.restaurantForm);

    if (this.openTimeFormvalue == null) {
      Swal.fire(Swaldata.SwalErrorToast('Please fill opening and closing hours'))
      return;
    }

    if (this.lat == -1 || this.lng == -1) {
      Swal.fire(Swaldata.SwalErrorToast("Location invalid"));
      return;
    }
    this.spinner.show();

    var formData = new FormData();
    Object.entries(this.restaurantForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )

    Object.entries(this.openTimeFormvalue).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )

    formData.set('created_by', this.UserID);
    formData.set('lat', this.lat);
    formData.set('lng', this.lng);

    this.selectedSubcats.map(selectedSubcat => {
      this.subcategoriesName += selectedSubcat.id + ',';
    })

    formData.set('subcategory', this.subcategoriesName.replace(/,\s*$/, ""));

    this.RestaurantService.createRestaurant(formData).subscribe(
      data => {
        this.showImagecropper = false;
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg));
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg));
        }
        this._router.navigate(['/owner/restaurants/list']);
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }
    ).add(() => {
      this.spinner.hide();
    });
  }

  openModel() {
    (<any>$('#openTimeModal')).modal('show');
  }

  submitTimeform() {
    this.openTimeFormvalue = this.openTimeForm.value;
    (<any>$('#openTimeModal')).modal('hide');
  }

  copyTiming() {
    let opentime = this.openTimeForm.get('monopen_time').value;
    let closetime = this.openTimeForm.get('monclose_time').value;

    this.openTimeForm.patchValue({
      monopen_time: opentime,
      monclose_time: closetime,
      tueopen_time: opentime,
      tueclose_time: closetime,
      wedopen_time: opentime,
      wedclose_time: closetime,
      thuopen_time: opentime,
      thuclose_time: closetime,
      friopen_time: opentime,
      friclose_time: closetime,
      satopen_time: opentime,
      satclose_time: closetime,
      sunopen_time: opentime,
      sunclose_time: closetime,
    })
  }

  clearTimining(day) {
    this.openTimeForm.controls[day + 'open_time'].setValue('');
    this.openTimeForm.controls[day + 'close_time'].setValue('');
  }



}
