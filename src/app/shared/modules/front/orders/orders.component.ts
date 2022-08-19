import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '../../../class/data-table-response';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../helpers/swalFunctionsData';
import { interval } from 'rxjs';
import { dataURLtoFile, dropdownsetting, cleanForm } from "../../../../shared/helpers/commonFunctions";
import * as moment from 'moment';
import jsPDF from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: ['.dataTables_empty { display: none; }', '.no-data-available{ text-align: center}', 'span.status-td{padding: 10px;background: rgb(229, 229, 229);border-radius: 4px;color: rgb(119, 119, 119);font-size:14px}', 'span.success{background: #c6e1c6;color: #5b841b;}', 'span.warning{background: #f8dda7;color: #94660c;}', 'span.primary{background: #c8d7e1;color: #2e4453;}', 'span.info{background: #d1ecf1; color: #0d5e7f;}', 'span.dark{background: #d6d8d9; color: #1e263e}', 'span.danger{background: #eba3a3;color: #761919;}', 'span.dark-danger,.dark-danger{color: #f5c6cb;background: #721c24;}', '.alert {padding:0.5rem 1.25rem}', 'select.ng-valid{border:1px solid #ced4da}', '.total-price{}']
})
export class OrdersComponent implements OnInit {

  @Input() resId: Number;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ordersList: Array<any> = [];
  userid: Number = parseInt(localStorage.getItem("currentUserId"));
  mySubscription: any;
  TypesFilters: any = {
    received: 0,
    preparing: 0,
    ready: 0,
    pickup: 0,
    delieved: 0,
    paymentfailed: 0,
    cancelled: 0
  }
  filterTotal: any = {
    received: 0,
    preparing: 0,
    ready: 0,
    pickup: 0,
    delieved: 0,
    paymentfailed: 0,
    cancelled: 0
  }
  orderStatus: any = -1;
  dropdownSettings = dropdownsetting;
  statusdata: any = [
    { "id": 'received', "itemName": 'Order Received' },
    { "id": 'preparing', "itemName": 'Preparing' },
    { "id": 'ready', "itemName": 'Ready' },
    { "id": 'pickup', "itemName": 'Pickup' },
    { "id": 'delivered', "itemName": 'Delivered' },
    { "id": 'paymentfailed', "itemName": 'Payment Failed' },
    { "id": 'cancelled', "itemName": 'Cancelled' },
  ];
  selectedstatuslist: any = [];
  restaurantList: any = [];
  maxDate: moment.Moment;
  selected: { startDate: moment.Moment; endDate: moment.Moment; };
  startDate: string;
  endDate: string;
  getOrdersTotal: any;
  isAdmin: boolean = false;

  head = [['#', 'Order id', 'User Name', 'Restaurnt', 'Created Date', 'Status', 'Delivery mode', 'Total']]

  data = []

  // TotalOrders: number = 0

  constructor(private http: HttpClient, private _router: Router, private RestaurantService: RestaurantService, private spinner: NgxSpinnerService) {
    this.maxDate = moment();
  }

  resetFilters() {
    this.resId = -1;
    this.orderStatus = -1;
    this.selected = null
    //this.selected = { startDate: null, endDate: null };
    this.rerender()
  }
  ngOnInit() {
    if (window.location.href.indexOf('admin') > -1)
      this.isAdmin = true
    this.getOrders();
    //get restaurant list of user
    this.RestaurantService.getrestaurantslist().subscribe(
      data => {
        data.data.map(data => {
          this.restaurantList.push(data);
        });

      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast("something went wrong"));
      }
    ).add(() => {
      this.spinner.hide();
    });

    // this.selectedstatuslist = [...this.statusdata]
  }

  getOrders() {
    this.spinner.show();
    var that = this;
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        dataTablesParameters['res_id'] = this.resId;
        dataTablesParameters['status'] = this.orderStatus;

        if (this.selected != null && this.selected.startDate && this.selected.endDate) {
          dataTablesParameters['startDate'] = this.startDate;
          dataTablesParameters['endDate'] = this.endDate
        }

        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}` + "/user/getorders?res_id=" + this.resId + "&loggedInUser_Id=" + this.userid + "&userid=" + this.userid, dataTablesParameters, {})
          .subscribe(resp => {
            console.log('resp++++++++: ', resp)
            this.data = []
            resp.data.forEach((element, i) => {
              let delivery_mode = ""
              if (element.delivery_mode == "1") {
                delivery_mode = "Home Delivery"
              } else if (element.delivery_mode == "2") {
                delivery_mode = "Pickup"
              } else {
                delivery_mode = "Dine"
              }
              this.data[i] = [i+1, element.orderid, element.username, element.res_name, element.created_at, element.status, delivery_mode, "$"+element.order_total]
            });
            that.ordersList = resp.data;
            this.TypesFilters = resp.TypesFilters
            this.getOrdersTotal = resp.getOrdersTotal
            this.filterTotal = resp.filterTotal
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
        { data: "orderid" },
        { data: "username" },
        { data: "res_name" },
        { data: "created_at" },
        { data: "status" },
        { data: "Delivery mode", searchable: false, orderable: false },
        { data: "order_total", searchable: false, orderable: false },
        { data: "action", searchable: false, orderable: false },
      ],
      "order": [[1, "desc"]]
    };

  }



  ngAfterViewInit(): void {
    this.dtTrigger.next();
    //in 10 seconds do something
    this.mySubscription = interval(60000).subscribe(x => {
      this.rerender();
    });
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe()
  }

  rerender(): void {
    if (this.selected != null) {
      this.startDate = moment(this.selected.startDate).format('YYYY-MM-DD');
      this.endDate = moment(this.selected.endDate).format('YYYY-MM-DD');
    }

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

  report() {
    var doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Orders Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('order.pdf');
  }

  // filter() {
  //   this.rerender()
  // }

}

