import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../../shared/class/user";
import { JsonPipe } from "@angular/common";


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
export class UserService {
    public currentUser: User;
    public apiUrl: string = `${environment.apiUrl}`;
    //get user id and send it with each request
    public loggedInUser_Id: Number;

    constructor(private http: HttpClient) {

        this.currentUser = {
            id: 0,
            name: "",
            email: "",
            role: "",
            address: "",
            city: "",
            phone: "",
            status: 0,
            profilepic: ""
        };
    }

    Setuserdata() {
        this.currentUser.profilepic = JSON.parse(localStorage.getItem('currentuser')).user.profileimage;
        this.currentUser.name = JSON.parse(localStorage.getItem('currentuser')).user.name;
    }
    //Register User

    dashboard() {
        this.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        const dashboard = `${environment.apiUrl}` + "/user/dashboard?loggedInUser_Id=" + this.loggedInUser_Id;
        return this.http.get(dashboard, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    register(user) {
        const registerUrl = this.apiUrl + "/user/registration";
        return this.http
            .post<any>(`${registerUrl}`, user, httpOptions)

    }


    //Get current User LoggedIn for Admin panel
    getCurrentUser(userid) {
        this.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        const getuser = `${environment.apiUrl}` + "/user/getUserinfo?userid=" + userid + "&loggedInUser_Id=" + this.loggedInUser_Id;
        return this.http.get(getuser, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    updateProfile(user) {
        this.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        const updateUSerUrl = this.apiUrl + "/user/update?loggedInUser_Id=" + this.loggedInUser_Id;
        return this.http
            .post<any>(`${updateUSerUrl}`, user)
            .pipe(
                map((resp: any) => {

                    return resp;
                })
            )


    }
    resetpasswordforFront(data) {
        return this.http.post<any>(`${this.apiUrl}` + "/api/resetpassword", data, httpOptions).pipe(map((resp: any) => { return resp; }))
    }

    activeuser(data) {
        return this.http.post<any>(`${this.apiUrl}` + "/user/activeuser", data, httpOptions).pipe(map((resp: any) => { return resp; }))
    }

    sendmsg(data) {
        this.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        data.loggedInUser_Id = this.loggedInUser_Id;
        return this.http.post<any>(`${this.apiUrl}` + "/user/sendmsg", data, httpOptions).pipe(map((resp: any) => { return resp; }))
    }

    getnotifications(page) {
        this.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        const notiurl = `${environment.apiUrl}` + "/user/getnotifications?page=" + page + "&loggedInUser_Id=" + this.loggedInUser_Id;
        return this.http.get(notiurl, httpOptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
}
