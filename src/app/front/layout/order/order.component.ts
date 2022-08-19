import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantService } from 'src/app/shared/services/frontServices/restaurant.service';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../shared/helpers/swalFunctionsData';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';

declare var Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  styles: ['h4{font-family: sans-serif;margin-bottom: 0px;}', 'span{display:block}', '.card{box-shadow: 0 7px 14px 0 rgba(60,66,87,.08), 0 3px 6px 0 rgba(0,0,0,.12);}', '.sec{background: #e3e8ee;}', '.verify_code p{border: 2px #fdbd34 solid;padding: 5px 10px;background:#fdbd34; font-size: 25px;}']
})
export class OrderComponent implements OnInit {
  order_id: number;
  user_id: number;
  orderDetail: any = []
  formatedCreatedDate: string;
  Orderitems: any;
  orderStatus: any;
  cardLast4: any;
  paymentError: any;
  driverDetail: any = []
  filepath: string = environment.fileurl + '/';

  show_driver_tip: boolean = false;
  driver_tip: number = 0;

  validCheckout: boolean = true;
  stripe: any;
  @ViewChild('cardElement', { static: false }) cardElement: ElementRef;

  cardErrors: any;
  card: any;
  Anetform: any;

  payment_method: string = '1';
  order_hash: string;


  constructor(private restaurantservice: RestaurantService, private _fb: FormBuilder, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    //get order detail
    this.order_id = parseInt(this.route.snapshot.paramMap.get("id"))
    this.order_hash = this.route.snapshot.paramMap.get("order_hash")
    this.user_id = parseInt(localStorage.getItem('currentUserId'))

    this.spinner.show()
    this.restaurantservice.getOrderDetail({ order_id: this.order_id, order_hash: this.order_hash, user_id: this.user_id }).subscribe(
      data => {
        console.log("getOrderDetail: ", data)
        if (data.status) {
          this.orderDetail = data.data
          let tempDate = new Date(data.data.created_date)
          this.formatedCreatedDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + " " + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds()
          this.Orderitems = JSON.parse(data.data.cart);
          this.orderStatus = data.data.status;

          if (this.orderDetail.payment_mode == 1) {
            if (JSON.parse(this.orderDetail.payment_data) && JSON.parse(this.orderDetail.payment_data).id)
              this.cardLast4 = '**** **** ****' + JSON.parse(this.orderDetail.payment_data).payment_method_details.card.last4;
            else
              this.paymentError = JSON.parse(this.orderDetail.payment_data).raw.message;
          }

          if (this.orderDetail.payment_mode == 3) {
            if (JSON.parse(this.orderDetail.payment_data) && JSON.parse(this.orderDetail.payment_data).transId)
              this.cardLast4 = JSON.parse(this.orderDetail.payment_data).accountNumber;
          }


          if (data.driver && data.driver.length > 0)
            this.driverDetail = data.driver[0]

          console.log(this.driverDetail)
        } else {
          Swal.fire(Swaldata.SwalErrorToast('you are not authorise to access this order'))
        }
      },
      err => {
      }
    ).add(() => {
      this.spinner.hide()
    })

    this.Anetform = this._fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expirationDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });

  }

  showDriverTip() {
    this.show_driver_tip = !this.show_driver_tip
    // this.loadStripe()
    this.stripe = Stripe(environment.stripe_key);
    const elements = this.stripe.elements();

    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      }
    };
    console.log(this.cardElement)

    this.card = elements.create('card', { style: style });
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });


  }

  givedriverRating(e) {
    console.log(e);
    let rating = 0;
    if (e && e.newValue)
      rating = e.newValue;
    else
      Swal.fire(Swaldata.SwalErrorToast('Rating is not selected'))

    if (this.driverDetail && this.driverDetail.user_id && this.driverDetail.user_id > 0 && e.newValue) {
      this.spinner.show()
      this.restaurantservice.giveDriverRating(rating, this.driverDetail.user_id, this.order_id).subscribe(
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
        this.spinner.hide()
      })
    }

  }

  payment_modeChange(value) {
    this.payment_method = value;
  }

  async tip(e) {
    e.preventDefault();

    if (this.driver_tip < 1)
      return Swal.fire(Swaldata.SwalErrorToast('Tip should be more than $1'))


    this.spinner.show()
    if (this.payment_method == '1') {
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        // Inform the customer that there was an error.
        this.cardErrors = error.message;
        //this.btnDisable = false
        this.spinner.hide()
      } else {
        this.payTip(token.id)
      }
    } else {
      if (!this.Anetform.valid)
        return Swal.fire(Swaldata.SwalErrorToast('Card detail is invalid'))

      this.payTip()
    }

  }

  payTip(token_id = null) {
    this.restaurantservice.driverTip(token_id, this.payment_method, this.driver_tip, this.order_id, this.driverDetail.user_id, this.Anetform.value).subscribe(
      data => {
        if (data.status) {
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
          this.driverDetail.tip = this.driver_tip;
        } else
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
      }, err => {
        Swal.fire(Swaldata.SwalErrorToast(err))
      }
    ).add(() => {
      this.spinner.hide()
    })
  }

  cancelOrder() {
    let cancel_Charge_per = this.orderDetail.cancel_charge && this.orderDetail.cancel_charge > 0 ? this.orderDetail.cancel_charge : 5;
    let cancel_charge = Number((Number(this.orderDetail.total * cancel_Charge_per) / 100).toFixed(2))
    Swal.fire(Swaldata.SwalConfirm(`Cancellation fee $${cancel_charge} will be charged on order cancellation. Please confirm`)).then((result) => {
      if (result.value) {
        this.spinner.show()
        this.restaurantservice.cancelOrder(this.order_id).subscribe(
          data => {
            if (data.status) {
              this.orderDetail.status = 'cancelled'
              return Swal.fire(Swaldata.SwalSuccessToast(data.msg))
            } else
              return Swal.fire(Swaldata.SwalErrorToast(data.msg))
          },
          err => {
            return Swal.fire(Swaldata.SwalErrorToast(err))
          }
        ).add(() => {
          this.spinner.hide()
        })
      }
    })
  }
}
