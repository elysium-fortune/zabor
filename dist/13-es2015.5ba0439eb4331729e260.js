(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"7+OI":function(t,e,i){"use strict";i.d(e,"a",function(){return a});var n=i("HDdC");function a(t){return!!t&&(t instanceof n.a||"function"==typeof t.lift&&"function"==typeof t.subscribe)}},Cw9h:function(t,e,i){"use strict";i.d(e,"b",function(){return l}),i.d(e,"a",function(){return o});var n=i("ybVy");const a=n.d.PROVIDER_ID,s=n.c.PROVIDER_ID,r=new n.b([{id:a,provider:new n.d("503957846512-vd52l44llpv3kpakqptach9hu3872c9p.apps.googleusercontent.com")},{id:s,provider:new n.c("227073711888379")}]);function l(){return r}class o{}},WOxR:function(t,e,i){"use strict";i.d(e,"a",function(){return c});var n=i("IheW"),a=i("AytR"),s=i("lJxs"),r=i("kmKP"),l=i("8Y7J"),o=i("iInd");const u={headers:new n.g({"Content-Type":"application/json"})};class c{constructor(t,e,i){this.http=t,this.route=e,this.userSerVice=i}login(t){const e=`${a.a.apiUrl}`+"/api/login";return this.http.post(e,t,u).pipe(Object(s.a)(t=>(t.status&&t.data.user&&t.data.token&&(this.userSerVice.currentUser=t.data.user,localStorage.setItem("token",t.data.token.toString()),localStorage.setItem("currentUserId",t.data.user.id),localStorage.setItem("currentuser",JSON.stringify({user:t.data.user}))),t)))}socialLogin(t){const e=`${a.a.apiUrl}`+"/api/loginbySocial";return this.http.post(e,t,u).pipe(Object(s.a)(t=>(t.status&&t.data.user&&t.data.token&&(this.userSerVice.currentUser=t.data.user,localStorage.setItem("token",t.data.token.toString()),localStorage.setItem("currentUserId",t.data.user.id),localStorage.setItem("currentuser",JSON.stringify({user:t.data.user}))),t)))}register(t){const e=a.a.apiUrl+"/api/registration";return this.http.post(`${e}`,t,u)}adminlogin(t){const e=`${a.a.apiUrl}`+"/admin/login";return this.http.post(e,t,u).pipe(Object(s.a)(t=>(t.status&&t.data.user&&t.data.token&&(this.userSerVice.currentUser=t.data.user,localStorage.setItem("token",t.data.token.toString()),localStorage.setItem("currentUserId",t.data.user.id),localStorage.setItem("currentuser",JSON.stringify({user:t.data.user}))),t)))}forgetPassword(t){const e=`${a.a.apiUrl}`+"/api/forgetPassword";return this.http.post(e,t,u).pipe(Object(s.a)(t=>t))}changePassword(t){t.loggedInUser_Id=parseInt(localStorage.getItem("currentUserId"));const e=`${a.a.apiUrl}`+"/change-password";return this.http.post(`${e}`,t,u).pipe(Object(s.a)(t=>t))}logout(){localStorage.removeItem("token"),localStorage.removeItem("currentuser"),localStorage.removeItem("currentUserId"),this.route.url.split("admin/").length>1?this.route.navigate(["/admin/login"]):this.route.navigate(["/login"])}}c.ngInjectableDef=l["\u0275\u0275defineInjectable"]({factory:function(){return new c(l["\u0275\u0275inject"](n.c),l["\u0275\u0275inject"](o.o),l["\u0275\u0275inject"](r.a))},token:c,providedIn:"root"})},dWOw:function(t,e,i){"use strict";i.d(e,"a",function(){return l});var n=i("ybVy"),a=(i("WOxR"),i("PSD3")),s=i.n(a),r=i("2ZTa");i("ofFa");class l{constructor(t,e,i,n,a,s){this._router=t,this._auth=e,this.spinner=i,this.userService=n,this.authService=a,this.translate=s}signInWithGoogle(){this.authService.signIn(n.d.PROVIDER_ID).then(t=>{t.id&&(this.spinner.show(),this._auth.socialLogin({email:t.email,role:"user",name:t.name,google_token:t.authToken}).subscribe(t=>{t.status?(s.a.fire(r.c("Login Successfully")),this.userService.Setuserdata(),this._router.navigate(["/"])):s.a.fire(r.b(t.msg))},t=>{s.a.fire(r.b("Something went wrong"))}).add(()=>{this.spinner.hide()}))})}signInWithFB(){this.authService.signIn(n.c.PROVIDER_ID).then(t=>{t.id&&(this.spinner.show(),this._auth.socialLogin({email:t.email,role:"user",name:t.name,fb_token:t.authToken}).subscribe(t=>{t.status?(s.a.fire(r.c("Login Successfully")),this.userService.Setuserdata(),this._router.navigate(["/"])):s.a.fire(r.b(t.msg))},t=>{s.a.fire(r.b("Something went wrong"))}).add(()=>{this.spinner.hide()}))})}ngOnInit(){}signOut(){this.authService.signOut()}}},ofFa:function(t,e,i){"use strict";i.d(e,"a",function(){return u});var n=i("IheW"),a=i("AytR"),s=i("lJxs"),r=i("8Y7J"),l=i("iInd");const o={headers:new n.g({"Content-Type":"application/json"})};class u{constructor(t,e){this.http=t,this.route=e,this.Setuserdata()}Setuserdata(){localStorage.getItem("currentuser")&&(this.profilepic=JSON.parse(localStorage.getItem("currentuser")).user.profileimage)}getSiteInfo(){let t=`${a.a.apiUrl}`+"/api/getsiteinfo";return this.http.get(t,o).pipe(Object(s.a)(t=>(this.sitedata=t.data,this.webdata=t.webdata,t)))}ContactUs(t){let e=`${a.a.apiUrl}`+"/api/contactus";return this.http.post(e,t,o).pipe(Object(s.a)(t=>t))}updateprofile(t){let e=`${a.a.apiUrl}`+"/api/user/update";return this.http.post(e,t).pipe(Object(s.a)(t=>t))}logout(){localStorage.removeItem("token"),localStorage.removeItem("currentuser"),localStorage.removeItem("currentUserId"),localStorage.removeItem("lat"),localStorage.removeItem("long"),this.route.navigate(["/login"])}changepass(t){let e=`${a.a.apiUrl}`+"/api/change-password";return this.http.post(e,t,o).pipe(Object(s.a)(t=>t))}addAddress(t){let e=`${a.a.apiUrl}`+"/api/add-address";return this.http.post(e,t,o).pipe(Object(s.a)(t=>t))}getAddress(t){let e=`${a.a.apiUrl}`+"/api/get-address?user_id="+t;return this.http.get(e,o).pipe(Object(s.a)(t=>t))}getOrders(t,e){let i=`${a.a.apiUrl}`+"/api/get-orders?user_id="+t+"&page="+e;return this.http.get(i,o).pipe(Object(s.a)(t=>t))}deleteAddress(t){let e=`${a.a.apiUrl}`+"/api/delete-address";return this.http.post(e,t,o).pipe(Object(s.a)(t=>t))}getFaqs(){let t=`${a.a.apiUrl}`+"/api/faqs";return this.http.get(t,o).pipe(Object(s.a)(t=>t))}driverReg(t){let e=`${a.a.apiUrl}`+"/api/driverReg";return this.http.post(e,t).pipe(Object(s.a)(t=>t))}ResReg(t){let e=`${a.a.apiUrl}`+"/api/ResReg";return this.http.post(e,t).pipe(Object(s.a)(t=>t))}}u.ngInjectableDef=r["\u0275\u0275defineInjectable"]({factory:function(){return new u(r["\u0275\u0275inject"](n.c),r["\u0275\u0275inject"](l.o))},token:u,providedIn:"root"})},uXlE:function(t,e,i){"use strict";i.d(e,"a",function(){return h}),i.d(e,"b",function(){return d});var n=i("8Y7J"),a=i("TSSN"),s=i("dWOw"),r=i("iInd"),l=i("WOxR"),o=i("7g+E"),u=i("ofFa"),c=i("ybVy"),h=n["\u0275crt"]({encapsulation:2,styles:[],data:{}});function d(t){return n["\u0275vid"](0,[(t()(),n["\u0275eld"](0,0,null,null,16,"div",[["class","login-with"]],null,null,null,null,null)),(t()(),n["\u0275eld"](1,0,null,null,2,"h5",[],null,null,null,null,null)),(t()(),n["\u0275ted"](2,null,["",""])),n["\u0275pid"](131072,a.i,[a.j,n.ChangeDetectorRef]),(t()(),n["\u0275eld"](4,0,null,null,12,"div",[["class","d-flex justify-content-center"]],null,null,null,null,null)),(t()(),n["\u0275eld"](5,0,null,null,5,"a",[["class","fb-btn social-btn"],["href","javascript:void(0)"]],null,[[null,"click"]],function(t,e,i){var n=!0,a=t.component;"click"===e&&(n=!1!==a.signInWithFB()&&n);return n},null,null)),(t()(),n["\u0275eld"](6,0,null,null,1,"span",[],null,null,null,null,null)),(t()(),n["\u0275eld"](7,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-facebook-official"]],null,null,null,null,null)),(t()(),n["\u0275eld"](8,0,null,null,2,"b",[],null,null,null,null,null)),(t()(),n["\u0275ted"](9,null,["",""])),n["\u0275pid"](131072,a.i,[a.j,n.ChangeDetectorRef]),(t()(),n["\u0275eld"](11,0,null,null,5,"a",[["class","google social-btn"],["href","javascript:void(0)"]],null,[[null,"click"]],function(t,e,i){var n=!0,a=t.component;"click"===e&&(n=!1!==a.signInWithGoogle()&&n);return n},null,null)),(t()(),n["\u0275eld"](12,0,null,null,1,"span",[],null,null,null,null,null)),(t()(),n["\u0275eld"](13,0,null,null,0,"i",[["class","fa fa-google"]],null,null,null,null,null)),(t()(),n["\u0275eld"](14,0,null,null,2,"b",[],null,null,null,null,null)),(t()(),n["\u0275ted"](15,null,["",""])),n["\u0275pid"](131072,a.i,[a.j,n.ChangeDetectorRef])],null,function(t,e){t(e,2,0,n["\u0275unv"](e,2,0,n["\u0275nov"](e,3).transform("Or log in with"))),t(e,9,0,n["\u0275unv"](e,9,0,n["\u0275nov"](e,10).transform("Log in with Facebook"))),t(e,15,0,n["\u0275unv"](e,15,0,n["\u0275nov"](e,16).transform("Log in with Google")))})}n["\u0275ccf"]("app-sociallogin",s.a,function(t){return n["\u0275vid"](0,[(t()(),n["\u0275eld"](0,0,null,null,1,"app-sociallogin",[],null,null,null,d,h)),n["\u0275did"](1,114688,null,0,s.a,[r.o,l.a,o.c,u.a,c.a,a.j],null,null)],function(t,e){t(e,1,0)},null)},{},{},[])},ybVy:function(t,e,i){"use strict";i.d(e,"a",function(){return d}),i.d(e,"b",function(){return h}),i.d(e,"c",function(){return b}),i.d(e,"d",function(){return I}),i.d(e,"e",function(){return g});var n,a=i("mrSG"),s=i("8Y7J"),r=i("jtHE"),l=i("7+OI"),o=i("2Vo4"),u=i("SxV6"),c=i("SVse");class h{constructor(t){this.lazyLoad=!1,this.providers=new Map,this._ready=new r.a,Object(l.a)(t)?t.pipe(Object(u.a)()).subscribe(t=>{this.initialize(t)}):this.initialize(t)}initialize(t){for(let e=0;e<t.length;e++){let i=t[e];this.providers.set(i.id,i.provider),this.lazyLoad=this.lazyLoad||i.lazyLoad}this._ready.next(),this._ready.complete()}}let d=n=class{constructor(t){this._user=null,this._authState=new r.a(1),this._readyState=new o.a([]),this.initialized=!1,t._ready.subscribe(()=>{this.providers=t.providers,t.lazyLoad||this.initialize()})}get authState(){return this._authState.asObservable()}get readyState(){return this._readyState.asObservable()}initialize(){this.initialized=!0,this.providers.forEach((t,e)=>{t.initialize().then(()=>{let i=this._readyState.getValue();i.push(e),this._readyState.next(i),t.getLoginStatus().then(t=>{t.provider=e,this._user=t,this._authState.next(t)}).catch(t=>{this._authState.next(null)})})})}signIn(t,e){return this.initialized||this.initialize(),new Promise((i,a)=>{let s=this.providers.get(t);s?s.signIn(e).then(e=>{e.provider=t,i(e),this._user=e,this._authState.next(e)}).catch(t=>{a(t)}):a(n.ERR_LOGIN_PROVIDER_NOT_FOUND)})}signOut(t=!1){return this.initialized||this.initialize(),new Promise((e,i)=>{if(this._user){let a=this._user.provider,s=this.providers.get(a);s?s.signOut(t).then(()=>{e(),this._user=null,this._authState.next(null)}).catch(t=>{i(t)}):i(n.ERR_LOGIN_PROVIDER_NOT_FOUND)}else i(n.ERR_NOT_LOGGED_IN)})}};var p;d.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",d.ERR_NOT_LOGGED_IN="Not logged in",d.ctorParameters=(()=>[{type:h}]),d=n=Object(a.b)([Object(s.Injectable)()],d);let g=p=class{constructor(t){if(t)throw new Error("SocialLoginModule is already loaded. Import it in the AppModule only")}static initialize(t){return{ngModule:p,providers:[d,{provide:h,useValue:t}]}}};g.ctorParameters=(()=>[{type:g,decorators:[{type:s.Optional},{type:s.SkipSelf}]}]),g=p=Object(a.b)([Object(s.NgModule)({imports:[c.c],providers:[d]}),Object(a.d)(0,Object(s.Optional)()),Object(a.d)(0,Object(s.SkipSelf)())],g);class f{}class m{constructor(){this._readyState=new o.a(!1)}onReady(){return new Promise((t,e)=>{this._readyState.subscribe(e=>{e&&t()})})}loadScript(t,e,i,n=!0,a=""){if("undefined"!=typeof document&&!document.getElementById(t)){let t=document.createElement("script");t.async=n,t.src=e,t.onload=i,document.head.appendChild(t)}}}class I extends m{constructor(t,e={scope:"email"}){super(),this.clientId=t,this.opt=e}initialize(){return new Promise((t,e)=>{this.loadScript(I.PROVIDER_ID,"https://apis.google.com/js/platform.js",()=>{gapi.load("auth2",()=>{this.auth2=gapi.auth2.init(Object.assign(Object.assign({},this.opt),{client_id:this.clientId})),this.auth2.then(()=>{this._readyState.next(!0),t()}).catch(t=>{e(t)})})})})}getLoginStatus(){return new Promise((t,e)=>{this.onReady().then(()=>{if(this.auth2.isSignedIn.get()){let e=new f,i=this.auth2.currentUser.get().getBasicProfile(),n=this.auth2.currentUser.get().getAuthResponse(!0).access_token,a=this.auth2.currentUser.get().getAuthResponse(!0).id_token;e.id=i.getId(),e.name=i.getName(),e.email=i.getEmail(),e.photoUrl=i.getImageUrl(),e.firstName=i.getGivenName(),e.lastName=i.getFamilyName(),e.authToken=n,e.idToken=a,t(e)}else e("No user is currently logged in.")})})}signIn(t){return new Promise((e,i)=>{this.onReady().then(()=>{(t&&t.offline_access||this.opt&&this.opt.offline_access?this.auth2.grantOfflineAccess(t):this.auth2.signIn(t)).then(t=>{let i=new f,n=this.auth2.currentUser.get().getBasicProfile(),a=this.auth2.currentUser.get().getAuthResponse(!0).access_token,s=this.auth2.currentUser.get().getAuthResponse(!0).id_token;i.id=n.getId(),i.name=n.getName(),i.email=n.getEmail(),i.photoUrl=n.getImageUrl(),i.firstName=n.getGivenName(),i.lastName=n.getFamilyName(),i.authToken=a,i.idToken=s,t&&t.code&&(i.authorizationCode=t.code),e(i)},t=>{i("User cancelled login or did not fully authorize.")}).catch(t=>{i(t)})})})}signOut(t){return new Promise((e,i)=>{this.onReady().then(()=>{let n;(n=t?this.auth2.disconnect():this.auth2.signOut()).then(t=>{t?i(t):e()}).catch(t=>{i(t)})})})}}I.PROVIDER_ID="GOOGLE";class b extends m{constructor(t,e={scope:"email,public_profile"},i="en_US",n="name,email,picture,first_name,last_name",a="v4.0"){super(),this.clientId=t,this.opt=e,this.locale=i,this.fields=n,this.version=a}initialize(){return new Promise((t,e)=>{this.loadScript(b.PROVIDER_ID,`//connect.facebook.net/${this.locale}/sdk.js`,()=>{FB.init({appId:this.clientId,autoLogAppEvents:!0,cookie:!0,xfbml:!0,version:this.version}),this._readyState.next(!0),t()})})}getLoginStatus(){return new Promise((t,e)=>{this.onReady().then(()=>{FB.getLoginStatus(i=>{if("connected"===i.status){let e=i.authResponse;FB.api(`/me?fields=${this.fields}`,i=>{let n=new f;n.id=i.id,n.name=i.name,n.email=i.email,n.photoUrl="https://graph.facebook.com/"+i.id+"/picture?type=normal",n.firstName=i.first_name,n.lastName=i.last_name,n.authToken=e.accessToken,n.facebook=i,t(n)})}else e("No user is currently logged in.")})})})}signIn(t){return new Promise((t,e)=>{this.onReady().then(()=>{FB.login(i=>{if(i.authResponse){let e=i.authResponse;FB.api(`/me?fields=${this.fields}`,i=>{let n=new f;n.id=i.id,n.name=i.name,n.email=i.email,n.photoUrl="https://graph.facebook.com/"+i.id+"/picture?type=normal",n.firstName=i.first_name,n.lastName=i.last_name,n.authToken=e.accessToken,n.facebook=i,t(n)})}else e("User cancelled login or did not fully authorize.")},this.opt)})})}signOut(){return new Promise((t,e)=>{this.onReady().then(()=>{FB.logout(e=>{t()})})})}}b.PROVIDER_ID="FACEBOOK"}}]);