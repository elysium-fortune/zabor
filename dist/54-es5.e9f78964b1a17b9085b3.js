(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{IGk6:function(n,t,l){"use strict";l.r(t);var e=l("CcnG"),a=function(){return function(){}}(),u=l("pMnS"),s=l("mg4X"),r=l("ZYjt"),i=l("ZYCi"),o=l("i7xd"),p=l("2ZTa"),c=l("o2af"),d=function(){function n(n,t,l,e,a,u){this.translation=n,this._route=t,this.route=l,this.restaurantService=e,this.spinner=a,this.translate=u,this.data=[]}return n.prototype.ngOnInit=function(){this.page=!isNaN(parseInt(this.route.snapshot.paramMap.get("id")))&&parseInt(this.route.snapshot.paramMap.get("id"))>0&&parseInt(this.route.snapshot.paramMap.get("id"))<6?parseInt(this.route.snapshot.paramMap.get("id")):1,this.getPageContent(),this.routeEvent(this._route)},n.prototype.getPageContent=function(){var n=this;this.spinner.show(),this.restaurantService.getStaticPages(this.page).subscribe(function(t){t.status&&(n.data=t.data.resp[0])},function(n){p.b("Something went wrong")}).add(function(){n.spinner.hide()})},n.prototype.routeEvent=function(n){var t=this;this.Routersubscription=n.events.subscribe(function(n){n instanceof i.e&&(t.page=!isNaN(parseInt(t.route.snapshot.paramMap.get("id")))&&parseInt(t.route.snapshot.paramMap.get("id"))>0&&parseInt(t.route.snapshot.paramMap.get("id"))<6?parseInt(t.route.snapshot.paramMap.get("id")):1,t.getPageContent())})},n.prototype.ngOnDestroy=function(){this.Routersubscription.unsubscribe()},n}(),h=l("miAi"),g=l("A7o+"),f=e["\u0275crt"]({encapsulation:0,styles:[".sec[_ngcontent-%COMP%]{padding:60px 0px}"],data:{}});function m(n){return e["\u0275vid"](0,[e["\u0275pid"](0,s.a,[r.DomSanitizer]),(n()(),e["\u0275eld"](1,0,null,null,9,"main",[],null,null,null,null,null)),(n()(),e["\u0275eld"](2,0,null,null,8,"section",[["class","sec sec-privacy-wrap"]],null,null,null,null,null)),(n()(),e["\u0275eld"](3,0,null,null,7,"div",[["class","container"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](5,0,null,null,3,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","sec-heading"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,1,"h2",[["class","heading-2 text-uppercase"]],null,null,null,null,null)),(n()(),e["\u0275ted"](8,null,[" ",""])),(n()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","col-md-12"]],[[8,"innerHTML",1]],null,null,null,null)),e["\u0275ppd"](10,2)],null,function(n,t){var l=t.component;n(t,8,0,"en"==l.translation.lang?null==l.data?null:l.data.page:null==l.data?null:l.data.page_es);var a="en"==l.translation.lang?null==l.data?null:l.data.content:e["\u0275unv"](t,9,0,n(t,10,0,e["\u0275nov"](t,0),null==l.data?null:l.data.content_es,"html"));n(t,9,0,a)})}var v=e["\u0275ccf"]("app-pages",d,function(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-pages",[],null,null,null,m,f)),e["\u0275did"](1,245760,null,0,d,[c.a,i.o,i.a,o.a,h.c,g.j],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),y=l("Ip0R"),b={title:"Pages",breadcrumb:"Pages"},w=function(){return function(){}}(),I=l("aYsj");l.d(t,"PagesModuleNgFactory",function(){return M});var M=e["\u0275cmf"](a,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,v]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,y.o,y.n,[e.LOCALE_ID,[2,y.I]]),e["\u0275mpd"](1073742336,y.c,y.c,[]),e["\u0275mpd"](1073742336,i.s,i.s,[[2,i.x],[2,i.o]]),e["\u0275mpd"](1073742336,w,w,[]),e["\u0275mpd"](1073742336,I.a,I.a,[]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](1024,i.m,function(){return[[{path:"",component:d,data:b}]]},[])])})},mg4X:function(n,t,l){"use strict";l.d(t,"a",function(){return e});var e=function(){function n(n){this.sanitizer=n}return n.prototype.transform=function(n,t){switch(t){case"html":return this.sanitizer.bypassSecurityTrustHtml(n);case"style":return this.sanitizer.bypassSecurityTrustStyle(n);case"script":return this.sanitizer.bypassSecurityTrustScript(n);case"url":return this.sanitizer.bypassSecurityTrustUrl(n);case"resourceUrl":return this.sanitizer.bypassSecurityTrustResourceUrl(n);default:throw new Error("Invalid safe type specified: "+t)}},n}()}}]);