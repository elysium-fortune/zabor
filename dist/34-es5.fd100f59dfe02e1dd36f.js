(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"K+Kt":function(l,n,t){"use strict";t.d(n,"a",function(){return o});var e=t("CcnG"),u=t("K9Ia"),i=function(l,n,t,e){var u,i=arguments.length,r=i<3?n:null===e?e=Object.getOwnPropertyDescriptor(n,t):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(l,n,t,e);else for(var o=l.length-1;o>=0;o--)(u=l[o])&&(r=(i<3?u(r):i>3?u(n,t,r):u(n,t))||r);return i>3&&r&&Object.defineProperty(n,t,r),r},r=function(l,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(l,n)},o=function(){function l(l){this.el=l,this.dtOptions={}}return l.prototype.ngOnInit=function(){var l=this;this.dtTrigger?this.dtTrigger.subscribe(function(){l.displayTable()}):this.displayTable()},l.prototype.ngOnDestroy=function(){this.dtTrigger&&this.dtTrigger.unsubscribe(),this.dt&&this.dt.destroy(!0)},l.prototype.displayTable=function(){var l=this;this.dtInstance=new Promise(function(n,t){Promise.resolve(l.dtOptions).then(function(t){setTimeout(function(){l.dt=$(l.el.nativeElement).DataTable(t),n(l.dt)})})})},i([Object(e.Input)(),r("design:type",Object)],l.prototype,"dtOptions",void 0),i([Object(e.Input)(),r("design:type",u.b)],l.prototype,"dtTrigger",void 0),l=i([Object(e.Directive)({selector:"[datatable]"}),r("design:paramtypes",[e.ElementRef])],l)}()},axVG:function(l,n,t){"use strict";t.d(n,"a",function(){return o});var e=t("CcnG"),u=t("Ip0R"),i=t("K+Kt"),r=function(l,n,t,e){var u,i=arguments.length,r=i<3?n:null===e?e=Object.getOwnPropertyDescriptor(n,t):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(l,n,t,e);else for(var o=l.length-1;o>=0;o--)(u=l[o])&&(r=(i<3?u(r):i>3?u(n,t,r):u(n,t))||r);return i>3&&r&&Object.defineProperty(n,t,r),r},o=function(){function l(){}var n;return n=l,l.forRoot=function(){return{ngModule:n}},l=n=r([Object(e.NgModule)({imports:[u.c],declarations:[i.a],exports:[i.a]})],l)}()},oTcB:function(l,n,t){"use strict";t("K+Kt"),t("axVG")},tNkw:function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){return function(){}}(),i=t("pMnS"),r=t("ZYCi"),o=t("Ip0R"),d=t("K+Kt"),a=t("q6HN"),c=t("K9Ia"),s=t("AytR"),f=(t("oTcB"),t("PSD3")),g=t.n(f),p=t("2ZTa"),h=function(){function l(l,n,t,e){this.http=l,this._router=n,this.adminService=t,this.spinner=e,this.dtOptions={},this.dtTrigger=new c.b,this.loggedInUser_Id=localStorage.getItem("currentUserId"),this.usersuggestions=[],this.openFeedback=""}return l.prototype.ngOnInit=function(){this.getfeedbacklist()},l.prototype.getfeedbacklist=function(){var l=this;this.spinner.show();var n=this;this.dtOptions={pageLength:10,serverSide:!0,processing:!0,ajax:function(t,e){n.http.post(s.a.apiUrl+"/admin/category-suggestion?loggedInUser_Id="+l.loggedInUser_Id,t,{}).subscribe(function(l){n.usersuggestions=l.data,e({recordsTotal:l.recordsTotal,recordsFiltered:l.recordsFiltered,data:[]})},function(n){l._router.navigate(["admin/dashboard"]),g.a.fire(p.b("Something went wrong"))})},columns:[{data:"id",searchable:!1,orderable:!1},{data:"username"},{data:"category"},{data:"created_at"},{data:"action",searchable:!1,orderable:!1}],order:[[3,"desc"]]},this.spinner.hide()},l.prototype.ngAfterViewInit=function(){this.dtTrigger.next()},l.prototype.rerender=function(){var l=this;this.dtElement.dtInstance.then(function(n){n.destroy(),l.dtTrigger.next(),l.dtElement.dtInstance.then(function(l){l.on("draw.dt",function(){$(".dataTables_empty").length>0&&$(".dataTables_empty").remove()})})})},l.prototype.deletesuggestion=function(l){var n=this;g.a.fire(p.a("Suggestion will delete")).then(function(t){t.value&&(n.spinner.show(),n.adminService.deleteSuggestion(l).subscribe(function(l){l.status?(g.a.fire(p.c(l.msg)),n.rerender()):g.a.fire(p.b(l.msg))},function(l){g.a.fire(p.b(l))}).add(function(){n.spinner.hide()}))})},l}(),b=t("t/Na"),m=t("miAi"),v=e["\u0275crt"]({encapsulation:0,styles:[".dataTables_empty[_ngcontent-%COMP%] { display: none; }",".no-data-available[_ngcontent-%COMP%]{ text-align: center}",".feedback-block[_ngcontent-%COMP%]{ padding : 30px}"],data:{}});function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"th",[["scope","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](2,null,["",""])),(l()(),e["\u0275eld"](3,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,2,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,t){var u=!0;"click"===n&&(u=!1!==e["\u0275nov"](l,5).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&u);return u},null,null)),e["\u0275did"](5,671744,null,0,r.r,[r.o,r.a,o.j],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275ted"](6,null,["",""])),(l()(),e["\u0275eld"](7,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](8,null,["",""])),(l()(),e["\u0275eld"](9,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](10,null,["",""])),(l()(),e["\u0275eld"](11,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,2,"a",[["class","btn btn-danger btn-sm badge"],["href","javascript:void(0)"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;"click"===n&&(e=!1!==u.deletesuggestion(l.context.$implicit.id)&&e);return e},null,null)),(l()(),e["\u0275eld"](13,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-trash"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Delete"]))],function(l,n){l(n,5,0,e["\u0275inlineInterpolate"](1,"/admin/user/view/",n.context.$implicit.user_id,""))},function(l,n){l(n,2,0,n.context.index+1),l(n,4,0,e["\u0275nov"](n,5).target,e["\u0275nov"](n,5).href),l(n,6,0,n.context.$implicit.username),l(n,8,0,n.context.$implicit.category),l(n,10,0,n.context.$implicit.created_at)})}function I(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](2,278528,null,0,o.l,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.component.usersuggestions)},null)}function O(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"td",[["class","no-data-available"],["colspan","5"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["No matching records found"]))],null,null)}function T(l){return e["\u0275vid"](0,[e["\u0275qud"](671088640,1,{dtElement:0}),(l()(),e["\u0275eld"](1,0,null,null,24,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,23,"div",[["class","col col-xs-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,22,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,2,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Category Suggestions"])),(l()(),e["\u0275eld"](7,0,null,null,18,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,17,"table",[["class","table-hover table-bordered"],["datatable",""]],null,null,null,null,null)),e["\u0275did"](9,212992,[[1,4]],0,d.a,[e.ElementRef],{dtOptions:[0,"dtOptions"],dtTrigger:[1,"dtTrigger"]},null),(l()(),e["\u0275eld"](10,0,null,null,11,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["#"])),(l()(),e["\u0275eld"](14,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["User Name"])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Category"])),(l()(),e["\u0275eld"](18,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Created date"])),(l()(),e["\u0275eld"](20,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Actions"])),(l()(),e["\u0275and"](16777216,null,null,1,null,I)),e["\u0275did"](23,16384,null,0,o.m,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,O)),e["\u0275did"](25,16384,null,0,o.m,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,9,0,t.dtOptions,t.dtTrigger),l(n,23,0,t.usersuggestions.length>0),l(n,25,0,0==t.usersuggestions.length)},null)}var R=e["\u0275ccf"]("app-category-suggestion",h,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-category-suggestion",[],null,null,null,T,v)),e["\u0275did"](1,4308992,null,0,h,[b.c,r.o,a.a,m.c],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),w={title:"Users Feedback"},C=function(){return function(){}}(),x=t("axVG");t.d(n,"CategorySuggestionModuleNgFactory",function(){return k});var k=e["\u0275cmf"](u,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,R]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,o.o,o.n,[e.LOCALE_ID,[2,o.I]]),e["\u0275mpd"](1073742336,o.c,o.c,[]),e["\u0275mpd"](1073742336,r.s,r.s,[[2,r.x],[2,r.o]]),e["\u0275mpd"](1073742336,C,C,[]),e["\u0275mpd"](1073742336,x.a,x.a,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,r.m,function(){return[[{path:"",component:h,data:w}]]},[])])})}}]);