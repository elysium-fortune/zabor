(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{IGk6:function(n,t,l){"use strict";l.r(t);var s=l("8Y7J");class a{}var e=l("pMnS"),u=l("mg4X"),r=l("cUpR"),i=l("iInd"),o=l("i7xd"),p=l("2ZTa"),c=l("o2af");class d{constructor(n,t,l,s,a,e){this.translation=n,this._route=t,this.route=l,this.restaurantService=s,this.spinner=a,this.translate=e,this.data=[]}ngOnInit(){this.page=!isNaN(parseInt(this.route.snapshot.paramMap.get("id")))&&parseInt(this.route.snapshot.paramMap.get("id"))>0&&parseInt(this.route.snapshot.paramMap.get("id"))<6?parseInt(this.route.snapshot.paramMap.get("id")):1,this.getPageContent(),this.routeEvent(this._route)}getPageContent(){this.spinner.show(),this.restaurantService.getStaticPages(this.page).subscribe(n=>{n.status&&(this.data=n.data.resp[0])},n=>{p.b("Something went wrong")}).add(()=>{this.spinner.hide()})}routeEvent(n){this.Routersubscription=n.events.subscribe(n=>{n instanceof i.e&&(this.page=!isNaN(parseInt(this.route.snapshot.paramMap.get("id")))&&parseInt(this.route.snapshot.paramMap.get("id"))>0&&parseInt(this.route.snapshot.paramMap.get("id"))<6?parseInt(this.route.snapshot.paramMap.get("id")):1,this.getPageContent())})}ngOnDestroy(){this.Routersubscription.unsubscribe()}}var h=l("7g+E"),g=l("TSSN"),m=s["\u0275crt"]({encapsulation:0,styles:[".sec[_ngcontent-%COMP%]{padding:60px 0px}"],data:{}});function v(n){return s["\u0275vid"](0,[s["\u0275pid"](0,u.a,[r.DomSanitizer]),(n()(),s["\u0275eld"](1,0,null,null,9,"main",[],null,null,null,null,null)),(n()(),s["\u0275eld"](2,0,null,null,8,"section",[["class","sec sec-privacy-wrap"]],null,null,null,null,null)),(n()(),s["\u0275eld"](3,0,null,null,7,"div",[["class","container"]],null,null,null,null,null)),(n()(),s["\u0275eld"](4,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(n()(),s["\u0275eld"](5,0,null,null,3,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),s["\u0275eld"](6,0,null,null,2,"div",[["class","sec-heading"]],null,null,null,null,null)),(n()(),s["\u0275eld"](7,0,null,null,1,"h2",[["class","heading-2 text-uppercase"]],null,null,null,null,null)),(n()(),s["\u0275ted"](8,null,[" ",""])),(n()(),s["\u0275eld"](9,0,null,null,1,"div",[["class","col-md-12"]],[[8,"innerHTML",1]],null,null,null,null)),s["\u0275ppd"](10,2)],null,function(n,t){var l=t.component;n(t,8,0,"en"==l.translation.lang?null==l.data?null:l.data.page:null==l.data?null:l.data.page_es);var a="en"==l.translation.lang?null==l.data?null:l.data.content:s["\u0275unv"](t,9,0,n(t,10,0,s["\u0275nov"](t,0),null==l.data?null:l.data.content_es,"html"));n(t,9,0,a)})}var y=s["\u0275ccf"]("app-pages",d,function(n){return s["\u0275vid"](0,[(n()(),s["\u0275eld"](0,0,null,null,1,"app-pages",[],null,null,null,v,m)),s["\u0275did"](1,245760,null,0,d,[c.a,i.o,i.a,o.a,h.c,g.j],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),f=l("SVse");const b={title:"Pages",breadcrumb:"Pages"};class S{}var w=l("aYsj");l.d(t,"PagesModuleNgFactory",function(){return I});var I=s["\u0275cmf"](a,[],function(n){return s["\u0275mod"]([s["\u0275mpd"](512,s.ComponentFactoryResolver,s["\u0275CodegenComponentFactoryResolver"],[[8,[e.a,y]],[3,s.ComponentFactoryResolver],s.NgModuleRef]),s["\u0275mpd"](4608,f.o,f.n,[s.LOCALE_ID,[2,f.I]]),s["\u0275mpd"](1073742336,f.c,f.c,[]),s["\u0275mpd"](1073742336,i.s,i.s,[[2,i.x],[2,i.o]]),s["\u0275mpd"](1073742336,S,S,[]),s["\u0275mpd"](1073742336,w.a,w.a,[]),s["\u0275mpd"](1073742336,a,a,[]),s["\u0275mpd"](1024,i.m,function(){return[[{path:"",component:d,data:b}]]},[])])})},mg4X:function(n,t,l){"use strict";l.d(t,"a",function(){return s});class s{constructor(n){this.sanitizer=n}transform(n,t){switch(t){case"html":return this.sanitizer.bypassSecurityTrustHtml(n);case"style":return this.sanitizer.bypassSecurityTrustStyle(n);case"script":return this.sanitizer.bypassSecurityTrustScript(n);case"url":return this.sanitizer.bypassSecurityTrustUrl(n);case"resourceUrl":return this.sanitizer.bypassSecurityTrustResourceUrl(n);default:throw new Error(`Invalid safe type specified: ${t}`)}}}}}]);