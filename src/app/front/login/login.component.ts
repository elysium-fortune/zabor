import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideToBottom } from "../../router.animations";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/frontServices/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as Swaldata from '../../shared/helpers/swalFunctionsData';
import { UserService } from 'src/app/shared/services/frontServices/user.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  public errorMessage: string;

  constructor(private _router: Router,
    private _auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) { }


  ngOnInit() {
    // this.spinner.show();
    // Check if user already logged In 
    this.errorMessage = '';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    $('body').addClass('nonepadding');
  }


  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show()
    this.submitted = true;
    this._auth.login(this.loginForm.value)
      .subscribe(
        res => {
          if (res.status) {
            Swal.fire(Swaldata.SwalSuccessToast("Login Successfully"));
            this.userService.Setuserdata()
            this._router.navigate(['/']);
          } else {
            Swal.fire(Swaldata.SwalErrorToast(res.msg));
          }
        },
        error => {
          Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
        }
      ).add(() => {
        this.spinner.hide()
      })
  }



}
