(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{IbWw:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class a{}var t=u("pMnS"),s=u("SVse"),i=u("o2af"),c=u("ofFa"),o=u("PSD3"),d=u.n(o),r=u("2ZTa");class p{constructor(l,n,u){this.translation=l,this.userService=n,this.spinner=u,this.faqs=[]}ngOnInit(){this.spinner.show(),this.userService.getFaqs().subscribe(l=>{l.status?this.faqs=l.faqs:d.a.fire(r.b(l.msg))},l=>{d.a.fire(r.b(l))}).add(()=>{this.spinner.hide()})}}var f=u("7g+E"),m=e["\u0275crt"]({encapsulation:0,styles:[".card-title[_ngcontent-%COMP%]{color: #222222;}"],data:{}});function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,8,null,null,null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"a",[["aria-expanded","true"],["class","card-title"],["data-toggle","collapse"]],[[8,"href",4]],null,null,null,null)),(l()(),e["\u0275ted"](3,null,["",". "," "])),(l()(),e["\u0275eld"](4,0,null,null,4,"div",[["class","card-body collapse"],["data-parent","#accordion"]],[[8,"id",0]],null,null,null,null)),e["\u0275prd"](512,null,s.D,s.E,[e.IterableDiffers,e.KeyValueDiffers,e.ElementRef,e.Renderer2]),e["\u0275did"](6,278528,null,0,s.k,[s.D],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e["\u0275pod"](7,{show:0}),(l()(),e["\u0275ted"](8,null,[" "," "]))],function(l,n){var u=l(n,7,0,0==n.context.index);l(n,6,0,"card-body collapse",u)},function(l,n){var u=n.component;l(n,2,0,e["\u0275inlineInterpolate"](1,"#collapse",n.context.index,"")),l(n,3,0,n.context.index+1,"en"==u.translation.lang?n.context.$implicit.faq_title:n.context.$implicit.faq_title_es),l(n,4,0,e["\u0275inlineInterpolate"](1,"collapse",n.context.index,"")),l(n,8,0,"en"==u.translation.lang?n.context.$implicit.faq_des:n.context.$implicit.faq_des_es)})}function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,13,"main",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,0,"section",[["class","inner-banner overlay search-banner"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,11,"section",[["class","sec sec-faq-wrap small-container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,10,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,3,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","sec-heading"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"h2",[["class","heading-2 text-center text-uppercase"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["faq's"])),(l()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,3,"div",[["class","accordion"],["id","accordion"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,2,"div",[["class","card mb-0"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,v)),e["\u0275did"](13,278528,null,0,s.l,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,13,0,n.component.faqs)},null)}var g=e["\u0275ccf"]("app-faq",p,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-faq",[],null,null,null,h,m)),e["\u0275did"](1,114688,null,0,p,[i.a,c.a,f.c],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),b=u("iInd");const q={title:"Faq",breadcrumb:"Faq"};class x{}u.d(n,"FaqModuleNgFactory",function(){return w});var w=e["\u0275cmf"](a,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[t.a,g]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,s.o,s.n,[e.LOCALE_ID,[2,s.I]]),e["\u0275mpd"](1073742336,s.c,s.c,[]),e["\u0275mpd"](1073742336,b.s,b.s,[[2,b.x],[2,b.o]]),e["\u0275mpd"](1073742336,x,x,[]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](1024,b.m,function(){return[[{path:"",component:p,data:q}]]},[])])})}}]);