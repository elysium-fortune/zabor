import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from "../../../shared/services/restaurant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '../../../shared/class/data-table-response';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../shared/helpers/swalFunctionsData';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}', 'span.status-td{padding: 10px;background: rgb(229, 229, 229);border-radius: 4px;color: rgb(119, 119, 119);font-size:14px}', 'span.success{background: #c6e1c6;color: #5b841b;}', 'span.warning{background: #f8dda7;color: #94660c;}', 'span.primary{background: #c8d7e1;color: #2e4453;}', 'span.danger{background: #eba3a3;color: #761919;}']
})
export class ReservationsComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  reservationList: Array<any> = [];
  userid: Number = parseInt(localStorage.getItem("currentUserId"));

  constructor(private http: HttpClient, private _router: Router, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    // this.spinner.show();
    var that = this;
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/user/getReservation?loggedInUser_Id=" + this.userid + "&userid=" + this.userid, dataTablesParameters, {})
          .subscribe(resp => { 
            that.reservationList = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          },
            error => {
              this._router.navigate(['owner/dashboard']);
              Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
            }).add(() => {
              this.spinner.hide();
            });
      },
      columns: [
        { data: "id", searchable: false, orderable: false },
        { data: "revid" },
        { data: "username" },
        { data: "res_name" },
        { data: "created_at" },
        { data: "action", searchable: false, orderable: false },
      ],
      "order": [[1, "desc"]]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.on('draw.dt', function () {
          if ($('.dataTables_empty').length > 0) {
            $('.dataTables_empty').remove();
          }
        });
      });
    });
  }
}
