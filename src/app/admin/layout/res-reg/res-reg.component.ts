import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { adminService } from "./../../../shared/services/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../shared/class/data-table-response';
import { DataTableDirective } from 'angular-datatables';
import { environment } from "../../../../environments/environment";
import Swal from 'sweetalert2';
import * as Swaldata from './../../../shared/helpers/swalFunctionsData';

@Component({
  selector: 'app-res-reg',
  templateUrl: './res-reg.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}']
})
export class ResRegComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/admin/resreg?loggedInUser_Id=" + this.loggedInUser_Id, dataTablesParameters, {})
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
        { data: "name" },
        { data: "email" },
        { data: "created_date" },
        { data: "action", searchable: false, orderable: false }

      ],
      order: [[3, "desc"]]
    };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

}
