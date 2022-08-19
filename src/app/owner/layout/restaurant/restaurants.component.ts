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
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}']
})
export class restaurantsComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pic_url = environment.fileurl + '/';
  restaurantList = [];
  userid: Number = parseInt(localStorage.getItem("currentUserId"));

  //get user id and send it with each request
  private loggedInUser_Id = localStorage.getItem("currentUserId");

  constructor(private http: HttpClient, private _router: Router, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    // this.titleService.setTitle("Restaurants");
  }

  ngOnInit() {

    this.getRestaurants();
  }

  getRestaurants() {
    this.spinner.show();
    var that = this;
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/user/getrestaurantlist?loggedInUser_Id=" + this.loggedInUser_Id + "&userid=" + this.userid, dataTablesParameters, {})
          .subscribe(resp => {
            console.log("resList: ", resp)
            that.restaurantList = resp.data;

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
        { data: "#", searchable: false, orderable: false },
        { data: "restaurantPic", searchable: false, orderable: false },
        { data: "restaurantname" },
        { data: "id", searchable: false, orderable: false },
        { data: "created_at" },
        { data: "status", searchable: false, orderable: false },
        { data: "action", searchable: false, orderable: false },
        { data: "menu", searchable: false, orderable: false },
        { data: "gallery", searchable: false, orderable: false }

      ],
      "order": [[3, "desc"]]
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

  changeStatus(event, id) {
    let status = (event == true) ? 1 : 0;
    let data = { status, id };
    this.spinner.show();
    this.RestaurantService.changerestaurantStatus(data).subscribe(res => {
      if (res) {
        if (res.status == 200) {
          Swal.fire(Swaldata.SwalSuccessToast(res.msg));
        } else {
          Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
        }

      }
      else {
        Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
      }

    }).add(() => {
      this.spinner.hide();
    });
  }

  DeleteRestaurant(event, res_id) {
    event.preventDefault();
    Swal.fire(Swaldata.SwalConfirm("All Restaurant data will delete")).then((result) => {
      if (result.value) {
        if (isNaN(res_id)) {
          Swal.fire(Swaldata.SwalErrorToast('Restaurant is invalid'));
          return;
        }
        this.spinner.show();
        this.RestaurantService.deleteRestaurant(res_id).subscribe(
          data => {
            if (data.status) {
              this.rerender();
              Swal.fire(Swaldata.SwalSuccessToast('Restaurant delete succefully'));
            }
            else {
              Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
            }
          },
          error => {
            Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          }
        ).add(() => {
          this.spinner.hide();
        })

      }
    })
  }

}
