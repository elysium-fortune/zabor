import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as Swaldata from '../../shared/helpers/swalFunctionsData';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    public errorMessage: string;

    constructor(private _router: Router,
        private _auth: AuthenticationService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        this.spinner.hide();
        // Check if user already logged In 
        this.errorMessage = '';
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }


    onSubmit() {

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.submitted = true;
        this.spinner.show()
        this._auth.employeelogin(this.loginForm.value)
            .subscribe(
                res => {
                    if (res.status) {
                        Swal.fire(Swaldata.SwalSuccessToast("Login Successfully"));
                        this._router.navigate(['/employee/dashboard']);
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
