import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RestaurantService } from "../../../../shared/services/restaurant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../../shared/class/data-table-response';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import * as Swaldata from './../../../../shared/helpers/swalFunctionsData';
declare var $: JQueryStatic;

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}', '#advert-image{width:100%}', 'td img{cursor: pointer;}', '.modal-content{border:none}']
})
export class AdvertComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pic_url = environment.fileurl + '/';
  advertList = [];
  userid: Number = parseInt(localStorage.getItem("currentUserId"));

  //get user id and send it with each request
  private loggedInUser_Id = localStorage.getItem("currentUserId");

  constructor(private http: HttpClient, private _router: Router, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAdverts();
  }

  getAdverts() {
    this.spinner.show();
    var that = this;
    this.dtOptions = {

      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/admin/get-adverts?loggedInUser_Id= " + this.loggedInUser_Id + "&userid=" + this.userid, dataTablesParameters, {})
          .subscribe(resp => {
          ;
            that.advertList = resp.data;
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
        { data: "pic", searchable: false, orderable: false },
        { data: "restaurantname" },
        { data: "username" },
        { data: "start_date" },
        { data: "end_date" },
        { data: "status", searchable: false, orderable: false },
        { data: "created_at", searchable: false, },
      ],
      order: [[7, "desc"]]
    };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  changeStatus(event, id) {
    let status = (event == true) ? 1 : 0;
    let data = { status, id };
    this.spinner.show();
    this.RestaurantService.changeadvertStatusForAdmin(data).subscribe(res => {
      if (res) {
        if (res.status) {
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
  openModel(imgsrc) {
    $("#advert-image").attr('src', imgsrc);
    (<any>$('#advertModal')).modal('show');
  }

}
