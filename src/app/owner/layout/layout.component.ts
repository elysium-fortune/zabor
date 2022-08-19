import { Component, OnInit, OnDestroy } from "@angular/core";
import { RestaurantService } from './../../shared/services/restaurant.service'
import { environment } from "../../../environments/environment";
import { interval, Subscription, timer } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Howl, Howler } from 'howler';


@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit, OnDestroy {
  collapedSideBar: boolean;
  mySubscription: Subscription;
  audio: any
  public myWebSocket: WebSocketSubject<any> = webSocket(`${environment.socketapi}user/getNewOrder`);
  constructor(private _route: Router, private RestaurantService: RestaurantService) {
    $('body').addClass('home');
  }

  ngOnInit() {
    this.subscribeWebsocket()
    this.sendNextWebsocketRequest()

    this.audio = new Howl({
      src: ['/assets/Alarm.mp3'],
      loop: true,
    });

  }

  subscribeWebsocket() {
    this.myWebSocket.subscribe(
      data => {
        console.log("websocket: ", data)
        if (data.status) {
          this._route.navigate(['owner/orders']);
          this.audio.play()
          Swal.fire({
            title: 'New Order',
            text: "You have Received a new order",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Go to Order',
            cancelButtonText: 'Leave it'
          }).then((result) => {
            if (result.value) {
              this._route.navigate(['owner/orders/edit/', data.data]);
            }
            this.audio.pause()
          })
        }
      }, err => {
        this.closeWebsocket()
        console.error(JSON.stringify(err, ["message", "arguments", "type", "name"]))
        timer(5000).pipe(take(1)).subscribe(x => {
          this.subscribeWebsocket()
          this.sendNextWebsocketRequest()
        });
      }
    )
  }

  sendNextWebsocketRequest() {
    this.mySubscription = interval(30000).subscribe(x => {
      //if (localStorage.getItem('token') && localStorage.getItem('currentUserId'))
      this.myWebSocket.next({ "token": localStorage.getItem('token'), "user_id": localStorage.getItem('currentUserId'), "rand": Math.random() });
    });
  }

  closeWebsocket() {
    this.myWebSocket.complete();
    this.mySubscription.unsubscribe()
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
  ngOnDestroy() {
    $('body').removeClass('home');
    this.closeWebsocket()
  }
}
