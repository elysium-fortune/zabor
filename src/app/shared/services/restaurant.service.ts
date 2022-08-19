import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, of, throwError, interval, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { JsonPipe } from "@angular/common";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import Swal from 'sweetalert2';


//get token
const token = localStorage.getItem('token');
const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    })
};

@Injectable({
    providedIn: "root"
})
export class RestaurantService {
    private apiUrl = `${environment.apiUrl}`;


    //get user id and send it with each request
    private loggedInUser_Id = localStorage.getItem("currentUserId");


    constructor(private http: HttpClient) {

    }



    getrestaurantslist() {
        const getrestorent = `${environment.apiUrl}` + "/user/getuserrestaurants?loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http.get(getrestorent, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    changerestaurantStatus(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId");
        return this.http.post(this.apiUrl + "/user/changerestaurantStatus", data, httpOptions).pipe(map((res: any) => { return res }))
    }

    createRestaurant(data) {
        const createRestaurantUrl = this.apiUrl + "/user/createRestaurant?loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http
            .post<any>(`${createRestaurantUrl}`, data)
            .pipe(
                map((resp: any) => {
                    return resp;
                })
            )

    }
    getcategoriesofRestaurent() {
        return this.http.get(this.apiUrl + "/user/getcategories?loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(map((res: any) => { return res }))
    }
    getsubcategory(catid) {
        return this.http.get(this.apiUrl + "/user/getsubcategory?catid=" + catid + "&loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(map((res: any) => { return res }))
    }
    getRestaurant(res_id, userid) {
        return this.http.get(this.apiUrl + "/user/getrestaurant?res_id=" + res_id + "&loggedInUser_Id=" + localStorage.getItem("currentUserId") + "&userid=" + userid, httpOptions).pipe(map((res: any) => { return res }))
    }
    updateRestaurant(data) {
        const updateRestaurantUrl = this.apiUrl + "/user/updateRestaurant?loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http
            .post<any>(`${updateRestaurantUrl}`, data)
            .pipe(
                map((resp: any) => {
                    return resp;
                })
            )

    }
    getgroupsofMenu(resId) {
        return this.http.get(this.apiUrl + "/user/getrestaurantgroups?resid=" + resId + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    getgroupsofMenuforadmin(resId) {
        return this.http.get(this.apiUrl + "/admin/getrestaurantgroups?resid=" + resId + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    createGroup(data) {
        return this.http.post<any>(this.apiUrl + '/user/creategroup?loggedInUser_Id=' + localStorage.getItem("currentUserId"), data).pipe(map((res: any) => { return res }))
    }

    getGroup(resid, groupid) {
        return this.http.get(this.apiUrl + "/user/getmenuGroup?resid=" + resid + "&groupid=" + groupid + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    getCustomization(resid, groupid) {
        return this.http.get(this.apiUrl + "/user/getGroupCustomization?resid=" + resid + "&groupid=" + groupid + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    deletegroup(resid, groupid) {
        return this.http.get(this.apiUrl + "/user/deleteGroup?resid=" + resid + "&groupid=" + groupid + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    deleteCustomization(resid, id) {
        return this.http.get(this.apiUrl + "/user/deleteCustomization?resid=" + resid + "&id=" + id + "&loggedInUser_Id=" + localStorage.getItem("currentUserId")).pipe(map((res: any) => { return res }))
    }

    getrestaurantslistForAdmin(userid) {
        const getrestorent = `${environment.apiUrl}` + "/admin/getrestaurantlist?userid=" + userid + "&loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http.get(getrestorent, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
    getrestaurantdetail(res_id) {
        return this.http.get(this.apiUrl + "/getrestaurantdetail?loggedInUser_Id=" + localStorage.getItem("currentUserId") + "&res_id=" + res_id, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
    changerestaurantStatusForAdmin(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId")
        return this.http.post(this.apiUrl + "/admin/changerestaurantStatus", data, httpOptions).pipe(map((res: any) => { return res }))
    }
    deleteRestaurant(res_id) {
        return this.http.post(this.apiUrl + "/user/deleteRestaurant", { res_id, "loggedInUser_Id": localStorage.getItem("currentUserId") }, httpOptions).pipe(map((res: any) => { return res }));
    }
    getadvert() {
        const getadvert = `${environment.apiUrl}` + "/user/promoAdvert?loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http.get(getadvert, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
    addAdvert(data) {
        return this.http.post(this.apiUrl + "/user/addPromoAdvert?loggedInUser_Id=" + localStorage.getItem("currentUserId"), data).pipe(map((res: any) => { return res }));
    }
    getadvertbyId(id) {
        return this.http.post(this.apiUrl + "/user/get-advertbyid", { id, loggedInUser_Id: localStorage.getItem("currentUserId") }).pipe(map((res: any) => { return res }));
    }
    deleteAdvert(advert_id) {
        return this.http.post(this.apiUrl + "/user/delete-advert", { advert_id, loggedInUser_Id: localStorage.getItem("currentUserId") }).pipe(map((res: any) => { return res }));
    }


    getpromovideo() {
        const getadvert = `${environment.apiUrl}` + "/user/promoVideo?loggedInUser_Id=" + localStorage.getItem("currentUserId");
        return this.http.get(getadvert, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
    addpromovideo(data) {
        return this.http.post(this.apiUrl + "/user/addPromoVideo?loggedInUser_Id=" + localStorage.getItem("currentUserId"), data).pipe(map((res: any) => { return res }));
    }
    getpromovideobyId(id) {
        return this.http.post(this.apiUrl + "/user/get-promovideobyid", { id, loggedInUser_Id: localStorage.getItem("currentUserId") }).pipe(map((res: any) => { return res }));
    }
    deletepromovideo(advert_id) {
        return this.http.post(this.apiUrl + "/user/delete-promovideo", { advert_id, loggedInUser_Id: localStorage.getItem("currentUserId") }).pipe(map((res: any) => { return res }));
    }

    changeadvertStatus(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId");
        return this.http.post(this.apiUrl + '/user/advert/status-change', data, httpOptions).pipe(map((res: any) => { return res }));
    }

    changepromovideoStatus(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId");
        return this.http.post(this.apiUrl + '/user/promovideo/status-change', data, httpOptions).pipe(map((res: any) => { return res }));
    }

    getReview(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId");
        const getreviews = `${environment.apiUrl}` + "/user/reviews";
        return this.http.post(getreviews, data, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    getreviewstatus(resId) {
        const getreviewsstauts = `${environment.apiUrl}` + "/user/reviewsstatus?res_id=" + resId + '&loggedInUser_Id=' + localStorage.getItem("currentUserId");;
        return this.http.get(getreviewsstauts, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    deletereview(review_id) {
        return this.http.get(this.apiUrl + '/admin/deletereview?review_id=' + review_id + "&loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );;
    }

    uploadgalleryImage(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId");
        return this.http.post(this.apiUrl + '/user/gallery', data, httpOptions).pipe(map((res: any) => { return res }));
    }

    getGalleryImage(res_id) {
        return this.http.get(this.apiUrl + '/user/getgallaryImage?res_id=' + res_id + "&loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );;
    }

    deletegalleryimage(image_id, res_id, img_path) {
        return this.http.get(this.apiUrl + '/user/deletegalleryImage?img_path=' + img_path + '&id=' + image_id + '&res_id=' + res_id + "&loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );;
    }

    changeadvertStatusForAdmin(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId")
        return this.http.post(this.apiUrl + "/admin/change-advert-status", data, httpOptions).pipe(map((res: any) => { return res }))
    }
    changeadvertvideoStatusForAdmin(data) {
        data.loggedInUser_Id = localStorage.getItem("currentUserId")
        return this.http.post(this.apiUrl + "/admin/change-advertvideo-status", data, httpOptions).pipe(map((res: any) => { return res }))
    }

    saveCustomizations(data) {
        data.loggedInUser_Id = localStorage.getItem('currentUserId');
        return this.http.post(this.apiUrl + "/user/save-customizations", data, httpOptions).pipe(map((res: any) => { return res }))
    }

    getCustomizationDetail(id) {
        return this.http.post(this.apiUrl + '/user/getCustomizationDetail', { loggedInUser_Id: localStorage.getItem('currentUserId'), id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    getOrderDetail(id) {
        return this.http.post(this.apiUrl + '/user/order-detail', { loggedInUser_Id: localStorage.getItem('currentUserId'), orderid: id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    changeOrderStatus(data) {
        return this.http.post(this.apiUrl + '/user/changeorderstatus', data, httpOptions).pipe(map((res: any) => { return res }))
    }

    getOwnerlist() {
        return this.http.get(this.apiUrl + '/admin/getOwnerlist?loggedInUser_Id=' + localStorage.getItem('currentUserId'), httpOptions).pipe(map((res: any) => { return res }))
    }

    changeOwner(ownerId, claimedstatus, res_id) {
        return this.http.post(this.apiUrl + '/admin/changeOwner', { loggedInUser_Id: localStorage.getItem('currentUserId'), claimedstatus, ownerId, res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    changeOwnerPermission(editallow, res_id) {
        return this.http.post(this.apiUrl + '/admin/changeOwnerPermission', { loggedInUser_Id: localStorage.getItem('currentUserId'), editallow, res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }
    addreservationSlot(options, res_id, date) {
        return this.http.post(this.apiUrl + '/user/addResslot', { date, loggedInUser_Id: localStorage.getItem('currentUserId'), options, res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    getResTimeSlots(res_id) {
        return this.http.post(this.apiUrl + '/user/getResTimeSlots', { loggedInUser_Id: localStorage.getItem('currentUserId'), res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }
    getSlot(res_id, date) {
        return this.http.post(this.apiUrl + '/user/getResslot', { date, loggedInUser_Id: localStorage.getItem('currentUserId'), res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    getReservationDetail(reservationId) {
        return this.http.post(this.apiUrl + '/user/getReservationDetail', { loggedInUser_Id: localStorage.getItem('currentUserId'), reservationId }, httpOptions).pipe(map((res: any) => { return res }))
    }

    getDriverForOrder(order_id) {
        return this.http.post(this.apiUrl + '/user/getDriverForOrder', { loggedInUser_Id: localStorage.getItem('currentUserId'), order_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    verifyCode(code, orderid) {
        return this.http.post(this.apiUrl + '/user/checkCodeOfDriver', { loggedInUser_Id: localStorage.getItem('currentUserId'), code, orderid }, httpOptions).pipe(map((res: any) => { return res }))
    }

    usemenu(use_res_id, res_id) {
        return this.http.post(this.apiUrl + '/user/usemenu', { loggedInUser_Id: localStorage.getItem('currentUserId'), use_res_id, res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }
    updateCookingTime(order_id, cookt) {
        return this.http.post(this.apiUrl + '/user/updateCookingTime', { loggedInUser_Id: localStorage.getItem('currentUserId'), order_id, cookt }, httpOptions).pipe(map((res: any) => { return res }))
    }
    uploadmenu(data) {
        return this.http.post(this.apiUrl + '/user/uploadmenu', data).pipe(map((res: any) => { return res }))
    }
    uploadinvQua(data) {
        return this.http.post(this.apiUrl + '/user/uploadinvQua', data).pipe(map((res: any) => { return res }))
    }

    deleteallmenu(res_id) {
        return this.http.post(this.apiUrl + '/user/deleteallmenu', { loggedInUser_Id: localStorage.getItem('currentUserId'), res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }
    verifyUserCode(code, orderid) {
        return this.http.post(this.apiUrl + '/user/verifyUserCode', { loggedInUser_Id: localStorage.getItem('currentUserId'), code, orderid }, httpOptions).pipe(map((res: any) => { return res }))
    }
    updatePaymentStatus(orderid) {
        return this.http.post(this.apiUrl + '/user/updatePaymentStatus', { loggedInUser_Id: localStorage.getItem('currentUserId'), orderid }, httpOptions).pipe(map((res: any) => { return res }))
    }
    stopSearching(orderid) {
        return this.http.post(this.apiUrl + '/user/stop-searching', { loggedInUser_Id: localStorage.getItem('currentUserId'), orderid }, httpOptions).pipe(map((res: any) => { return res }))
    }
    saveDiscount(data) {
        return this.http.post(this.apiUrl + '/user/save-discount', data, httpOptions).pipe(map((res: any) => { return res }))
    }
    getDiscount(res_id) {
        return this.http.post(this.apiUrl + '/user/get-discount', { loggedInUser_Id: localStorage.getItem('currentUserId'), res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }
    deldis(discount_id) {
        return this.http.post(this.apiUrl + '/user/del-discount', { loggedInUser_Id: localStorage.getItem('currentUserId'), discount_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    checkallowtoeditdiscount(res_id) {
        return this.http.post(this.apiUrl + '/user/checkallowtoeditdiscount', { loggedInUser_Id: localStorage.getItem('currentUserId'), res_id }, httpOptions).pipe(map((res: any) => { return res }))
    }

    saveStripeAccount(res_id, stripe_acc) {
        return this.http.post(this.apiUrl + '/admin/saveStripeAccount', { loggedInUser_Id: localStorage.getItem('currentUserId'), res_id, stripe_acc }, httpOptions).pipe(map((res: any) => { return res }))
    }

    getInvoiceImages(index) {
        return this.http.get(this.apiUrl + '/user/getInvoiceImage?index=' + index + "&loggedInUser_Id=" + localStorage.getItem("currentUserId"), httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );;
    }

    saveAthAccount(res_id, ath_acc, ath_secret) {
        return this.http
          .post(
            this.apiUrl + "/admin/saveAthAccount",
            {
              loggedInUser_Id: localStorage.getItem("currentUserId"),
              res_id,
              ath_acc,
              ath_secret
            },
            httpOptions
          )
          .pipe(
            map((res: any) => {
              return res;
            })
          );
    }

    saveStripeFee(res_id, stripe_fee) {
        return this.http
          .post(
            this.apiUrl + "/admin/saveStripFee",
            {
              loggedInUser_Id: localStorage.getItem("currentUserId"),
              res_id,
              stripe_fee
            },
            httpOptions
          )
          .pipe(
            map((res: any) => {
              return res;
            })
          );
    }
    saveEditor(data) {
        return this.http
            .post(this.apiUrl + "/user/saveEditor",
            {
                loggedInUser_Id: localStorage.getItem("currentUserId"),
                ...data,
            },
            httpOptions
            )
            .pipe(
            map((res: any) => {
                return res;
            })
            );
    }
    getEditors() {
        return this.http
            .get(this.apiUrl + `/user/getEditors?loggedInUser_Id=${localStorage.getItem("currentUserId")}`,
            httpOptions
            )
            .pipe(
            map((res: any) => {
                return res;
            })
            );
    }
    deleteEditor(id) {
        return this.http
            .get(this.apiUrl + `/user/deleteEditor?loggedInUser_Id=${localStorage.getItem("currentUserId")}&id=${id}`,
            httpOptions
            )
            .pipe(
            map((res: any) => {
                return res;
            })
            );
    }
}



