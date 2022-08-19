import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { noOnlyWhitespaceValidator } from 'src/app/shared/helpers/custom.validator';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantService } from "../../../../shared/services/restaurant.service";
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styles: ['.discount-Card{cursor: pointer;}'],
  styleUrls: ['./discount.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class DiscountComponent implements OnInit {
  discountform: FormGroup;
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
  res_id: number;
  discounts: any = []
  backgroundColors: Array<any> = ['bg-primary', 'bg-danger', 'bg-success', 'bg-warning', 'bg-dark'];
  discount_id: number = -1;
  showSpinner: any = {
    edit: false,
    list: false
  };
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService, private _router: Router) { }

  ngOnInit() {
    //get restaurant id 
    this.res_id = parseInt(this.route.snapshot.paramMap.get("id"));

    //check if allow to edit
    this.RestaurantService.checkallowtoeditdiscount(this.res_id).subscribe(
      data => {
        if (!data.status) {
          Swal.fire(Swaldata.SwalErrorToast("You are not allow to edit "));
          this._router.navigate(['/owner/restaurants/list']);
        }
      }
    )
    this.discountform = this.formBuilder.group(
      {
        user_type: ["", [Validators.required]],
        percentage: ["", [Validators.required, Validators.pattern('[0-9]?[0-9]?(\.[0-9][0-9]?)?')]],
        moa: [null, [Validators.pattern('[0-9\+\-\]+')]],
        mpd: [null, [Validators.pattern('[0-9\+\-\]+')]],
        dis_condition: ["", []]
      },
    );
    // this.spinner.show()
    this.getdiscounts()
  }

  getdiscounts() {
    this.showSpinner.list = true;
    this.RestaurantService.getDiscount(this.res_id).subscribe(
      data => {
        if (data.status) {
          this.discounts = data.data
        } else {
          this.discounts = []
        }
      },
      err => {
        Swal.fire(Swaldata.SwalErrorToast(err));
      }
    ).add(() => {
      this.showSpinner.list = false;
    })
  }

  onSubmit() {
    if (!this.discountform.valid)
      return

    let data = this.discountform.value;

    data['res_id'] = this.res_id
    data['loggedInUser_Id'] = localStorage.getItem('currentUserId')
    data['discount_id'] = this.discount_id;

    this.spinner.show()
    this.RestaurantService.saveDiscount(data).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
        }
      },
      err => {
        Swal.fire(Swaldata.SwalErrorToast(err));
      }
    ).add(() => {
      this.discountform.reset()
      this.discount_id = -1
      this.spinner.hide()
      this.getdiscounts()
    })
  }

  editDiscount(i) {
    this.showSpinner.edit = true
    let discount = this.discounts[i]
    this.discount_id = discount.id
    this.discountform.patchValue({
      user_type: discount.user_type,
      percentage: discount.percentage,
      moa: discount.moa,
      mpd: discount.mpd,
      dis_condition: discount.dis_condition
    })
    setTimeout(() => {
      this.showSpinner.edit = false
    }, 500)
  }

  addDiscount() {
    this.discountform.reset();
    this.discount_id = -1
  }

  deleteDis() {
    if (this.discount_id == -1)
      return;


    Swal.fire(Swaldata.SwalConfirm("Discount will delete")).then(async (result) => {
      if (result.value) {
        this.RestaurantService.deldis(this.discount_id).subscribe(
          data => {
            if (data.status)
              Swal.fire(Swaldata.SwalSuccessToast(data.msg))
            else
              Swal.fire(Swaldata.SwalErrorToast(data.msg))
          },
          err => {
            Swal.fire(Swaldata.SwalErrorToast(err))
          }
        ).add(() => {
          this.discount_id = -1;
          this.discountform.reset();
          this.getdiscounts()
        })
      }
    })
  }
}
