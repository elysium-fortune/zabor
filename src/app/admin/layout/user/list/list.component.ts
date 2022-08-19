import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { adminService } from "./../../../../shared/services/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../../shared/class/data-table-response';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import * as Swaldata from './../../../../shared/helpers/swalFunctionsData';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  profile_url = environment.fileurl + '/';

  //get user id and send it with each request
  private loggedInUser_Id = localStorage.getItem("currentUserId");

  userList = [];

  constructor(private http: HttpClient, private _router: Router, private adminService: adminService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getUserslist();
  }

  getUserslist() {
    this.spinner.show();
    var that = this;
    this.dtOptions = {

      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/admin/userlist?loggedInUser_Id=" + this.loggedInUser_Id, dataTablesParameters, {})
          .subscribe(resp => {

            that.userList = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });

          },
            error => {
              this._router.navigate(['admin/dashboard']);
              Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
            }).add(() => {
              this.spinner.hide();
            });
      },
      columns: [
        { data: "id", searchable: false, orderable: false },
        { data: "Pic", searchable: false, orderable: false },
        { data: "restaurantname" },
        { data: "email" },
        { data: "role" },
        { data: "created_date" },
        { data: "status", searchable: false, orderable: false },
        { data: "action", searchable: false, orderable: false }

      ],
      order: [[5, "desc"]]
    };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  changeStatus(event, id) {
    let status = (event == true) ? 1 : 0;
    let data = { status, id };
    this.spinner.show();
    this.adminService.changeStatus(data).subscribe(res => {
      if (res) {
        if (res.status == 200) {
          Swal.fire(Swaldata.SwalSuccessToast(res.msg));
        } else {
          Swal.fire(Swaldata.SwalErrorToast(res.msg));
        }

      }
      else {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }

    }).add(() => {
      this.spinner.hide();
    });
  }

}
