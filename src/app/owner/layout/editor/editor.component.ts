import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../shared/services/restaurant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../shared/helpers/swalFunctionsData';
import { noOnlyWhitespaceValidator, MustMatch } from 'src/app/shared/helpers/custom.validator';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorgroup: FormGroup;
  restaurantLists: any[] = [];
  editorId: number = -1;
  editors: any = [];

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private RestaurantService: RestaurantService) { }

  ngOnInit() {
    console.log('a')
    //get restaurant of user
    this.RestaurantService.getrestaurantslist().subscribe(
      data => {
        console.log('data', data)
        if (data.status == 200)
          this.restaurantLists = [...data.data];
      }
    )

    this.getEditors()

    this.editorgroup = this.formBuilder.group(
      {
        'name': ["", [Validators.required, noOnlyWhitespaceValidator]],
        'email': ["", [Validators.required, Validators.email]],
        'password': ["", []],
        'confirmPassword': ["", []],
        'res_id': ['', [Validators.required]],
        'status': [1, [Validators.required]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  getEditors() {
    //get editors of owner
    this.RestaurantService.getEditors().subscribe(
      data => {
        if (data.status) {
          this.editors = data.editors;
          console.log(this.editors)
        }
      }
    )
  }
  get passwordControl() {
    return this.editorgroup.get('password') as FormControl;
  }

  get confirmpasswordControl() {
    return this.editorgroup.get('confirmPassword') as FormControl;
  }

  editEditor(id) {
    this.reset()
    this.editorId = id;
    this.editors.forEach(element => {
      if (element.id == id) {
        this.editorgroup.patchValue({
          'name': element.name,
          'email': element.email,
          'res_id': element.res_id,
          'status': element.status
        })
      }
    });

  }

  addEditor() {
    this.reset()
    // this.passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
    // this.confirmpasswordControl.setValidators([Validators.required]);
    // this.passwordControl.updateValueAndValidity();
    // this.confirmpasswordControl.updateValueAndValidity();
    console.log(this.editorgroup);
  }

  reset() {
    this.editorgroup.reset()
    this.editorId = -1;
  }

  onSubmit() {
    if (!this.editorgroup.valid)
      return;

    if (this.editorId == -1) {
      console.log(this.editorgroup.value.password)
      if (!this.editorgroup.value.password || this.editorgroup.value.password.trim() == '')
        return Swal.fire(Swaldata.SwalErrorToast('Please enter a valid password'))

      // if()
    }

    this.spinner.show()
    console.log(this.editorgroup.value);
    let data = this.editorgroup.value
    data['editorId'] = this.editorId;
    this.RestaurantService.saveEditor(data).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
          this.reset()
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
        }
      }, err => {

      }
    ).add(() => {
      this.spinner.hide()
      this.getEditors()
    })
  }
  deleteEditor(id) {
    this.reset();
    Swal.fire(Swaldata.SwalConfirm("Employee will be deleted")).then((result) => {
      if (result.value) {
        this.spinner.show()
        this.RestaurantService.deleteEditor(id).subscribe(
          data => {
            if (data.status) {
              Swal.fire(Swaldata.SwalSuccessToast(data.msg))
              this.reset()
            } else {
              Swal.fire(Swaldata.SwalErrorToast(data.msg))
            }
          },
          err => {
            Swal.fire(Swaldata.SwalErrorToast(err))
          }
        ).add(() => {
          this.spinner.hide()
          this.getEditors()
        })
      }
    })
  }
}
