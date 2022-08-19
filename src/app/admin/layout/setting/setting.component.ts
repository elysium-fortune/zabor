import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { adminService } from "./../../../shared/services/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { noOnlyWhitespaceValidator, validateTax } from "../../../shared/helpers/custom.validator";
import Swal from 'sweetalert2';
import * as Swaldata from './../../../shared/helpers/swalFunctionsData';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class SettingComponent implements OnInit {

  Webdata: FormGroup;
  settingForm: FormGroup;
  pic: any;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      '|', 'ClearFormat', 'Print', 'SourceCode']
  };

  constructor(private formBuilder: FormBuilder, private adminService: adminService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.settingForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email, noOnlyWhitespaceValidator, Validators.maxLength(40)]],
        contact: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.pattern('[0-9\+\-\]+'), Validators.maxLength(40)]],
        address: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(200)]],
        city: ["", [Validators.required, noOnlyWhitespaceValidator, Validators.maxLength(25)]],
        food_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        drink_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        grand_tax: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        delivery_charge: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        driver_fee: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?'), validateTax, Validators.maxLength(5)]],
        fb_link: [""],
        twitter_link: [""],
        insta_link: [""],
        base_delivery_distance: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
        extra_delivery_charge: ['', [Validators.required, Validators.min(0)]]
      },
    );

    this.Webdata = this.formBuilder.group({
      f_l_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_l_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_r_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_r_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_d_h_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_d_d_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_d_h_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
      f_d_d_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
      b_h_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      b_h_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
      b_c_en: ["", [Validators.required, noOnlyWhitespaceValidator]],
      b_c_es: ["", [Validators.required, noOnlyWhitespaceValidator]],
    })

    this.spinner.show()
    this.adminService.getSetting().subscribe(
      data => {

        if (data.status) {
          this.settingForm.patchValue({
            email: data.data.email,
            address: data.data.address,
            contact: data.data.contact,
            city: data.data.city,
            food_tax: data.data.food_tax,
            drink_tax: data.data.drink_tax,
            grand_tax: data.data.grand_tax,
            delivery_charge: data.data.delivery_charge,
            driver_fee: data.data.driver_fee,
            fb_link: data.data.fb_link,
            twitter_link: data.data.twitter_link,
            insta_link: data.data.insta_link,
            base_delivery_distance: data.data.base_delivery_distance,
            extra_delivery_charge: data.data.extra_delivery_charge
          })

          this.Webdata.patchValue({
            f_l_en: data.webdata.f_l_en,
            f_l_es: data.webdata.f_l_es,
            f_r_en: data.webdata.f_r_en,
            f_r_es: data.webdata.f_r_es,
            f_d_h_en: data.webdata.f_d_h_en,
            f_d_d_en: data.webdata.f_d_d_en,
            f_d_h_es: data.webdata.f_d_h_es,
            f_d_d_es: data.webdata.f_d_d_es,
            b_h_en: data.webdata.b_h_en,
            b_h_es: data.webdata.b_h_es,
            b_c_en: data.webdata.b_c_en,
            b_c_es: data.webdata.b_c_es,
          })
        }
      },
      err => {

      }
    ).add(() => {
      this.spinner.hide()
    })
  }

  fileChangeEvent(event: any, field): void {
    if (event.target.files && event.target.files.length) {
      this.pic = event.target.files[0];
    }
  }


  onSubmitWebData() {
    if (!this.Webdata.valid)
      return false

    var formData = new FormData();

    Object.entries(this.Webdata.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )

    formData.set('pic', this.pic)
    formData.set('loggedInUser_Id', localStorage.getItem("currentUserId"))

    this.spinner.show()
    this.adminService.SetWebdata(formData).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
        }
      },
      err => {
        Swal.fire(Swaldata.SwalErrorToast(err))
      }
    ).add(() => {
      this.spinner.hide()
    })
  }

  onSubmit() {
    if (!this.settingForm.valid)
      return false

    this.spinner.show()
    this.adminService.updateSetting(this.settingForm.value).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
        }
      },
      err => {
        Swal.fire(Swaldata.SwalErrorToast(err))
      }
    ).add(() => {
      this.spinner.hide()
    })
  }

}


