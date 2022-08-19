import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RestaurantService } from "../../../../shared/services/restaurant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { noOnlyWhitespaceValidator, validateTax } from "../../../../shared/helpers/custom.validator";
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from "../../../../../environments/environment";
import { dataURLtoFile, dropdownsetting, cleanForm, cityLists } from "../../../../shared/helpers/commonFunctions";
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
declare var $: JQueryStatic;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: ['agm-map { height: 400px}', '.form-control[readonly]{background-color: #ffffff }', '.profile - pic - div{ width: 100px; height: 100px; border: 1px gray solid; }'],
  styleUrls: ['../restaurant.component.scss']
})
export class EditComponent implements OnInit {
  restaurantForm: FormGroup;
  openTimeForm: FormGroup;
  openTimeFormvalue: any = null

  imagepath: string = "";
  private file: File | null = null;
  restaurantImage: string = "";
  imageChangedEvent: any = '';
  croppedImage: any = '';

  dataURLtoFile = dataURLtoFile;
  showImagecropper: Boolean = true;
  UserID: string | Blob;
  restaurantId;
  Categories: [];
  cat_id: number;
  subcategories: any = [];

  selectedSubcats = [];
  dropdownSettings = dropdownsetting;
  subcategoriesName: string = "";

  lat;
  lng;
  zoom;
  public searchControl: FormControl;

  public cityList: any = cityLists;

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {

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
  ngOnInit() {

    this.spinner.show();
    this.zoom = 15;

    this.restaurantForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(60)]],
        email: ["", [Validators.required, Validators.email]],
        description: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
        descriptiones: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
        address: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
        status: [1, [Validators.required]],
        restaurantpic: [null],
        category: [null, [Validators.required]],
        subcategory: [null],
        convenience_fee_type: ["0"],
        convenience_fee: [0],
        food_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        drink_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        grand_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        delivery_charge: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        driver_fee: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        base_delivery_distance: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
        city: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(25)]],
        contact: ["", [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9\+\-\]+'), Validators.minLength(10)]],
        website: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        avaragecost: ["", [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]+')]],
        cod: [1, [Validators.required]],
        min_order_value: ['', [Validators.required, Validators.min(0), Validators.pattern("[0-9+-]+")]],
        max_order_value: ['', [Validators.required, Validators.min(0), Validators.pattern("[0-9+-]+")]],
        cancel_charge: [5, [Validators.required, Validators.max(100), Validators.pattern("[0-9+-]+")]]
      },
    );
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
    //get categories of restaurant
    this.RestaurantService.getcategoriesofRestaurent().subscribe(
      data => {
        this.Categories = data.data;
        this.spinner.hide();
      }, error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
        this._router.navigate(['/owner/restaurants']);
      }
    )
    //get restaurant id 
    this.restaurantId = parseInt(this.route.snapshot.paramMap.get("id"));
    //get current user 
    this.UserID = localStorage.getItem('currentUserId');

    //get restaurant 
    this.RestaurantService.getRestaurant(this.restaurantId, this.UserID).subscribe(
      data => {
        console.log("getRes: ", data)
        if (data.status == 200) {
          this.restaurantForm.patchValue({
            name: data.data.name,
            email: data.data.email,
            description: data.data.description,
            descriptiones: data.data.description_es,
            address: data.data.address,
            status: data.data.status,
            category: data.data.category,
            convenience_fee: data.data.convenience_fee,
            convenience_fee_type: data.data.convenience_fee_type,
            food_tax: data.data.food_tax,
            grand_tax: data.data.grand_tax,
            drink_tax: data.data.drink_tax,
            delivery_charge: data.data.delivery_charge,
            base_delivery_distance: data.data.base_delivery_distance,
            driver_fee: data.data.driver_fee,
            city: data.data.city,
            contact: data.data.contact,
            website: data.data.website,
            avaragecost: data.data.avg_cost,
            cod: data.data.cod,
            min_order_value: data.data.min_order_value,
            max_order_value: data.data.max_order_value,
            cancel_charge: data.data.cancel_charge
          });

          this.openTimeForm.patchValue({
            monopen_time: data.data.monopen_time,
            monclose_time: data.data.monclose_time,
            tueopen_time: data.data.tueopen_time,
            tueclose_time: data.data.tueclose_time,
            wedopen_time: data.data.wedopen_time,
            wedclose_time: data.data.wedclose_time,
            thuopen_time: data.data.thuopen_time,
            thuclose_time: data.data.thuclose_time,
            friopen_time: data.data.friopen_time,
            friclose_time: data.data.friclose_time,
            satopen_time: data.data.satopen_time,
            satclose_time: data.data.satclose_time,
            sunopen_time: data.data.sunopen_time,
            sunclose_time: data.data.sunclose_time,
          })

          this.restaurantImage = environment.fileurl + '/' + data.data.restaurantpic;
          this.cat_id = data.data.category;
          this.lat = data.data.latitude;
          this.lng = data.data.longitude;
          //set subcategories
          this.getSubcat();
          this.openTimeFormvalue = this.openTimeForm.value;

          if (data.subcat[0])
            data.subcat.map(subcat => { this.selectedSubcats.push({ "id": subcat.id, "itemName": subcat.name }); });


        } else {

          Swal.fire(Swaldata.SwalErrorToast("Restaurant not found"));
          this._router.navigate(['/owner/restaurants/list']);
        }
      }, error => {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }
    ).add(() => {
      this.spinner.hide();
    });

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
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



  }

  getSubcat() {
    this.subcategories = [];
    this.selectedSubcats = [];
    this.spinner.show();
    this.cat_id = parseInt(this.restaurantForm.value.category);
    this.RestaurantService.getsubcategory(this.cat_id).subscribe(data => {
      if (data.status == 200) {
        if (data.subcategories.length > 0)
          data.subcategories.map(subcat => {
            this.subcategories.push({ "id": subcat.id, "itemName": subcat.name })
          })
        // this.selectedSubcats = [];
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
  onSubmit() {
    if (this.restaurantForm.invalid) {
      return;
    }
    // cleanForm(this.restaurantForm); 
    this.spinner.show();

    var formData = new FormData();
    Object.entries(this.restaurantForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    );

    Object.entries(this.openTimeFormvalue).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )

    formData.set("res_id", this.restaurantId);
    formData.set('lat', this.lat);
    formData.set('lng', this.lng);

    this.selectedSubcats.map(selectedSubcat => {
      this.subcategoriesName += selectedSubcat.id + ',';
    })

    formData.set('subcategory', this.subcategoriesName.replace(/,\s*$/, ""));

    this.RestaurantService.updateRestaurant(formData).subscribe(
      data => {
        if (data.status != false)
          Swal.fire(Swaldata.SwalSuccessToast(data.msg));
        else
          Swal.fire(Swaldata.SwalErrorToast(data.msg));

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
    if (this.checkTimeForm())
      (<any>$('#openTimeModal')).modal('hide');
  }

  checkTimeForm() {
    //  console.error(this.openTimeFormvalue);
    return true;
  }

  copyTiming() {
    let opentime = this.openTimeForm.value.monopen_time;
    let closetime = this.openTimeForm.value.monclose_time;

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
