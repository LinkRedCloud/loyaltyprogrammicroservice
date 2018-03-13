/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","hammerjs","ojs/ojpagingtabledatasource","ojs/ojinputtext","ojs/ojvalidation-number","ojs/ojjquery-hammer"],function(a,g,c,b){(function(){a.hb("oj.ojPagingControl",g.oj.baseComponent,{version:"1.0.0",defaultElement:"\x3cdiv\x3e",widgetEventPrefix:"oj",options:{data:null,overflow:"fit",pageSize:25,pageOptions:{layout:["auto"],type:"numbers",maxPageLinks:6,orientation:"horizontal"},loadMoreOptions:{maxCount:500},mode:"page",ready:null},cb:{bEa:"labelAccPaging",
XDa:"labelAccNavFirstPage",YDa:"labelAccNavLastPage",ZDa:"labelAccNavNextPage",aEa:"labelAccNavPreviousPage",$Da:"labelAccNavPage",dEa:"labelLoadMore",eEa:"labelLoadMoreMaxRows",pea:"labelNavInputPage",CZ:"labelNavInputPageMax",c7a:"labelNavInputPageSummary",uea:"msgItemRangeCurrent",JZ:"msgItemRangeCurrentSingle",vea:"msgItemRangeItems",vEa:"msgItemRangeOfAtLeast",uEa:"msgItemRangeOfApprox",wEa:"msgItemRangeOf",tfa:"tipNavInputPage",UFa:"tipNavPageLink",vfa:"tipNavNextPage",wfa:"tipNavPreviousPage",
sfa:"tipNavFirstPage",ufa:"tipNavLastPage",hz:"pageInvalid.summary",W6a:"pageInvalid.detail",Mda:"dataInvalidType.summary",Lda:"dataInvalidType.detail",tDa:"maxPageLinksInvalid.summary",sDa:"maxPageLinksInvalid.detail"},vc:{Zv:"oj-component",zj:"oj-active",YO:"oj-clickable-icon-nocontext",Ld:"oj-disabled",Vq:"oj-enabled",JH:"oj-focus",KH:"oj-focus-highlight",Zq:"oj-hover",hg:"oj-selected"},na:{QEa:"oj-pagingcontrol",Gea:"oj-pagingcontrol-acc-label",Hea:"oj-pagingcontrol-content",Iea:"oj-pagingcontrol-loadmore",
wP:"oj-pagingcontrol-loadmore-link",UZ:"oj-pagingcontrol-loadmore-max-rows",xP:"oj-pagingcontrol-loadmore-range",VZ:"oj-pagingcontrol-loadmore-range-current",WZ:"oj-pagingcontrol-loadmore-range-max",Kea:"oj-pagingcontrol-nav",REa:"oj-pagingcontrol-nav-arrow",Jea:"oj-pagingcontrol-nav-arrow-section",$Z:"oj-pagingcontrol-nav-page",dFa:"oj-pagingcontrol-nav-page-ellipsis",TEa:"oj-pagingcontrol-nav-dot",SEa:"oj-pagingcontrol-nav-dot-bullet",cFa:"oj-pagingcontrol-nav-page-acc-label",Mea:"oj-pagingcontrol-nav-label",
Lea:"oj-pagingcontrol-nav-input-section",qz:"oj-pagingcontrol-nav-input",VH:"oj-pagingcontrol-nav-input-max",WH:"oj-pagingcontrol-nav-input-summary",XZ:"oj-pagingcontrol-nav-input-summary-current",YZ:"oj-pagingcontrol-nav-input-summary-max",Oea:"oj-pagingcontrol-nav-pages-section",Nea:"oj-pagingcontrol-nav-pages-links",UH:"oj-pagingcontrol-nav-first",UEa:"oj-pagingcontrol-nav-first-acc-label",Xv:"oj-pagingcontrol-nav-previous",eFa:"oj-pagingcontrol-nav-previous-acc-label",Wv:"oj-pagingcontrol-nav-next",
$Ea:"oj-pagingcontrol-nav-next-acc-label",XH:"oj-pagingcontrol-nav-last",XEa:"oj-pagingcontrol-nav-last-acc-label",VEa:"oj-pagingcontrol-nav-first-icon",fFa:"oj-pagingcontrol-nav-previous-icon",aFa:"oj-pagingcontrol-nav-next-icon",YEa:"oj-pagingcontrol-nav-last-icon",WEa:"oj-pagingcontrol-nav-first-vertical-icon",gFa:"oj-pagingcontrol-nav-previous-vertical-icon",bFa:"oj-pagingcontrol-nav-next-vertical-icon",ZEa:"oj-pagingcontrol-nav-last-vertical-icon",RP:"oj-component-icon",Um:"oj-helper-hidden-accessible"},
Ada:"data-oj-pagenum",bh:"enabled",er:"disabled",eI:"tabindex",$q:{mz:"loadMore",RZ:"page"},Fj:{Mm:"auto",AH:"all",RH:"input",iFa:"rangeText",OEa:"pages",wea:"nav"},PEa:6,MP:{h7a:"numbers",jDa:"dots"},firstPage:function(){return null!=this.Lc()?this.xo(0,!1):this.dE()},previousPage:function(){if(null!=this.Lc()){var a=this.li();if(0<a)return this.xo(a-1,!1)}return this.dE()},nextPage:function(){if(null!=this.Lc()){var a=this.li();if(this.ej()&&a+1<=this.ig()-1||0>this.ig()||!this.ej())return this.xo(a+
1,!1)}return this.dE()},lastPage:function(){return null!=this.Lc()&&0<this.ig()?this.xo(this.ig()-1,!1):this.dE()},page:function(a){return null!=this.Lc()&&(this.ej()&&a<=this.ig()-1||0>this.ig()||!this.ej())?this.xo(a,!1):this.dE()},loadNext:function(){return null!=this.Lc()?this.cSa():this.dE()},refresh:function(){this._super();this.kg()},getNodeBySubId:function(a){if(null==a)return this.element?this.element[0]:null;var b=a.subId,c=null;"oj-pagingcontrol-nav-input"===b?c=this.ih().find("."+this.na.qz)[0]:
"oj-pagingcontrol-nav-input-max"===b?c=this.ih().find("."+this.na.VH)[0]:"oj-pagingcontrol-nav-input-summary"===b?c=this.ih().find("."+this.na.WH)[0]:"oj-pagingcontrol-nav-input-summary-current"===b?c=this.ih().find("."+this.na.XZ)[0]:"oj-pagingcontrol-nav-input-summary-max"===b?c=this.ih().find("."+this.na.YZ)[0]:"oj-pagingcontrol-nav-first"===b?c=this.ih().find("."+this.na.UH)[0]:"oj-pagingcontrol-nav-next"===b?c=this.ih().find("."+this.na.Wv)[0]:"oj-pagingcontrol-nav-previous"===b?c=this.ih().find("."+
this.na.Xv)[0]:"oj-pagingcontrol-nav-last"===b?c=this.ih().find("."+this.na.XH)[0]:"oj-pagingcontrol-nav-page"===b?(a=a.index,c=this.ih().find("["+this.Ada+"\x3d"+a+"]")[0]):"oj-pagingcontrol-load-more-link"===b?c=this.ih().find("."+this.na.wP)[0]:"oj-pagingcontrol-load-more-range"===b?c=this.ih().find("."+this.na.xP)[0]:"oj-pagingcontrol-load-more-range-current"===b?c=this.ih().find("."+this.na.VZ)[0]:"oj-pagingcontrol-load-more-range-max"===b?c=this.ih().find("."+this.na.WZ)[0]:"oj-pagingcontrol-load-more-max-rows"===
b&&(c=this.ih().find("."+this.na.UZ)[0]);void 0===c&&(c=null);return c},getSubIdByNode:function(a){return g(a).hasClass(this.na.qz)?{subId:"oj-pagingcontrol-nav-input"}:g(a).hasClass(this.na.VH)?{subId:"oj-pagingcontrol-nav-input-max"}:g(a).hasClass(this.na.WH)?{subId:"oj-pagingcontrol-nav-input-summary"}:g(a).hasClass(this.na.XZ)?{subId:"oj-pagingcontrol-nav-input-summary-current"}:g(a).hasClass(this.na.YZ)?{subId:"oj-pagingcontrol-nav-input-summary-max"}:g(a).hasClass(this.na.UH)?{subId:"oj-pagingcontrol-nav-first"}:
g(a).hasClass(this.na.Wv)?{subId:"oj-pagingcontrol-nav-next"}:g(a).hasClass(this.na.Xv)?{subId:"oj-pagingcontrol-nav-previous"}:g(a).hasClass(this.na.XH)?{subId:"oj-pagingcontrol-nav-last"}:g(a).hasClass(this.na.$Z)?{subId:"oj-pagingcontrol-nav-page",index:g(a).attr(this.Ada)}:g(a).hasClass(this.na.wP)?{subId:"oj-pagingcontrol-load-more-link"}:g(a).hasClass(this.na.xP)?{subId:"oj-pagingcontrol-load-more-range"}:g(a).hasClass(this.na.VZ)?{subId:"oj-pagingcontrol-load-more-range-current"}:g(a).hasClass(this.na.WZ)?
{subId:"oj-pagingcontrol-load-more-range-max"}:g(a).hasClass(this.na.UZ)?{subId:"oj-pagingcontrol-load-more-max-rows"}:null},qc:function(){this._super();this.gJ();this._on(this.Ut)},Kf:function(){this._super();this.LE();this.mK=!0},tp:function(){this._super();this.Vp(this.ih());this.LA();this.mK?(this.Qra(),this.mK=!1):this.kg()},sp:function(){this._super();this.aq();this.vn()},pD:function(b){var c=a.Context.getContext(this.element[0]).Rc();b={description:"The component identified by '"+this.element.attr("id")+
"' "+b};c=c.Vc(b);this.gw||(this.gw=[]);this.gw.push(c);return c},kL:function(a){if(this.gw){var b=this.gw.indexOf(a);0<=b&&(this.gw.splice(b,1),a())}},_destroy:function(){this.aq();this.EU();if(this.gw){for(var a;a=this.gw.pop();)a();this.gw=null}this.SI=!0},gJ:function(){var a=this.options;this.element.addClass(this.na.QEa);this.element.addClass(this.vc.Zv);this.dKa();this.fKa();a.mode==this.$q.mz?(this.fia(),this.gia(),this.hia()):this.iia()},Ut:{"mouseup .oj-pagingcontrol-loadmore-link":function(a){this.loadNext();
g(a.target).data("_mouseup",!0);a.preventDefault()},"click .oj-pagingcontrol-loadmore-link":function(a){g(a.target).data("_mouseup")?g(a.target).data("_mouseup",!1):this.loadNext();a.preventDefault()},"click .oj-pagingcontrol-nav-dot":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=g(b.currentTarget).attr("data-oj-pagenum"),f=this;this.page(c).then(function(){f=null},function(b){var c=f.R(f.cb.hz);a.D.error(c+"\n"+b);f=null})}b.preventDefault()},"click .oj-pagingcontrol-nav-page":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=
g(b.currentTarget).attr("data-oj-pagenum"),f=this;this.page(c).then(function(){f=null},function(b){var c=f.R(f.cb.hz);a.D.error(c+"\n"+b);f=null})}b.preventDefault()},"click .oj-pagingcontrol-nav-first":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=this;this.firstPage().then(function(){c=null},function(b){var d=c.R(c.cb.hz);a.D.error(d+"\n"+b);c=null})}b.preventDefault()},"click .oj-pagingcontrol-nav-previous":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=this;this.previousPage().then(function(){c=
null},function(b){var d=c.R(c.cb.hz);a.D.error(d+"\n"+b);c=null})}b.preventDefault()},"click .oj-pagingcontrol-nav-next":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=this;this.nextPage().then(function(){c=null},function(b){var d=c.R(c.cb.hz);a.D.error(d+"\n"+b);c=null})}b.preventDefault()},"click .oj-pagingcontrol-nav-last":function(b){if(!g(b.currentTarget).hasClass(this.vc.Ld)){var c=this;this.lastPage().then(function(){c=null},function(b){var d=c.R(c.cb.hz);a.D.error(d+"\n"+b);
c=null})}b.preventDefault()},"keypress .oj-pagingcontrol-nav-input":function(a){13==a.which&&a.preventDefault()},"mousedown .oj-pagingcontrol-nav-first":function(a){g(a.currentTarget).hasClass(this.vc.Ld)||g(a.target).addClass(this.vc.zj);a.preventDefault()},"mousedown .oj-pagingcontrol-nav-previous":function(a){g(a.currentTarget).hasClass(this.vc.Ld)||g(a.target).addClass(this.vc.zj);a.preventDefault()},"mousedown .oj-pagingcontrol-nav-next":function(a){g(a.currentTarget).hasClass(this.vc.Ld)||g(a.target).addClass(this.vc.zj);
a.preventDefault()},"mousedown .oj-pagingcontrol-nav-last":function(a){g(a.currentTarget).hasClass(this.vc.Ld)||g(a.target).addClass(this.vc.zj);a.preventDefault()},"mouseup .oj-pagingcontrol-nav-first":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseup .oj-pagingcontrol-nav-previous":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseup .oj-pagingcontrol-nav-next":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseup .oj-pagingcontrol-nav-last":function(a){g(a.target).removeClass(this.vc.zj);
a.preventDefault()},"mouseleave .oj-pagingcontrol-nav-first":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseleave .oj-pagingcontrol-nav-previous":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseleave .oj-pagingcontrol-nav-next":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()},"mouseleave .oj-pagingcontrol-nav-last":function(a){g(a.target).removeClass(this.vc.zj);a.preventDefault()}},kg:function(){this.p!=this.options.data&&(this.P0(),
this.Qra());var a=0,b=0;null!=this.p&&(b=this.p.getStartItemIndex());null!=this.p&&0!=this.p.totalSize()&&0<=this.p.getEndItemIndex()&&(a=this.p.getEndItemIndex()-b+1);this.options.mode==this.$q.mz?this.mVa(a,b):this.nVa(a,b)},_setOption:function(b,c){this._superApply(arguments);this.xo(0,!0).then(function(){},function(b){a.D.error(b)});if(this.options.mode!=this.$q.mz&&"pageOptions"==b){var f=this.Vk();null!=f&&(this.DU(f),this.EU(),f.empty());this.LIa();this.iia();this.LE()}this.HA()},P0:function(){null!=
this.p&&this.aq();this.p=null},KIa:function(){this.r0=this.q0=this.p0=null},LIa:function(){this.u0=this.t0=this.s0=null},FQ:function(a,b,c,h,k,l){var m=g(document.createElement("a"));m.attr("role","button");m.addClass(this.na.REa);m.addClass(a);m.addClass(b);m.addClass(this.na.RP);m.addClass(this.vc.YO);m.addClass(this.vc.Ld);m.attr("aria-disabled","true");a=this.R(c);this.xg(m);this._focusable({element:m,applyHighlight:!0});m.attr("title",a);m.attr(this.eI,"0");m.attr("href","#");m.attr("oncontextmenu",
"return false;");h=this.R(h);k=this.e1(h,k);m.append(k);l&&m.css("display","block");return m},PQ:function(a,b){b?(a.addClass(this.vc.Ld),a.removeClass(this.vc.Vq),a.removeClass(this.vc.KH),a.removeClass(this.vc.JH),a.attr("aria-disabled","true"),a.attr("tabindex","-1")):(a.addClass(this.vc.Vq),a.removeClass(this.vc.Ld),a.removeAttr("aria-disabled"),a.attr(this.eI,"0"))},li:function(){var a=this.Lc(),b=0;null!=a&&(b=a.getPage());return b},Lc:function(){this.p||null==this.options.data||(this.p=this.options.data,
this.LA());return this.p},R2:function(a,b){var c=0<=b?b:0,h=g(document.createElement("span")),k=g(document.createElement("span"));this.options.mode==this.$q.mz?k.addClass(this.na.VZ):k.addClass(this.na.XZ);h.append(k);var l=this.Lc();if(null!=l&&null!=l.totalSize()&&null!=a){var m=this.R(this.cb.JZ,{pageFrom:c}),m=parseInt(b,10)+parseInt(a,10),c=0<m?c+1:0;if(-1!=l.totalSize()){m=m>l.totalSize()?l.totalSize():m;if(c==m)m=this.R(this.cb.JZ,{pageFrom:c});else{if(c>m)return h;m=this.R(this.cb.uea,{pageFrom:c,
pageTo:m})}var c=this.R(this.cb.wEa),p=null;"atLeast"==l.totalSizeConfidence()?p=this.R(this.cb.vEa):"estimate"==l.totalSizeConfidence()&&(p=this.R(this.cb.uEa));var t=g(document.createElement("span"));null==p?t.text(" "+c+" "):t.text(" "+p+" ");h.append(t);c=g(document.createElement("span"));this.options.mode==this.$q.mz?c.addClass(this.na.WZ):c.addClass(this.na.YZ);c.text(l.totalSize());h.append(c)}else m=0==a?this.R(this.cb.JZ,{pageFrom:0}):this.R(this.cb.uea,{pageFrom:c,pageTo:m});l=this.R(this.cb.vea);
c=g(document.createElement("span"));c.text(" "+l);h.append(c);k.text(m)}return h},hla:function(){var a=this.options.pageOptions.maxPageLinks;this.options.pageOptions.type==this.MP.jDa?a=Number.MAX_VALUE:a||(a=this.PEa);return a},ila:function(a){var b=0;0<this.ig()&&this.ej()?b=this.ig():0<a?(a=this.Lc(),b=null==a||"atLeast"!=a.totalSizeConfidence()&&"estimate"!=a.totalSizeConfidence()?this.li()+2:this.ig()+1):b=this.li()+1;return b},dE:function(){return Promise.reject()},ig:function(){var a=this.Lc(),
b=0;null!=a&&(b=a.getPageCount());return-1<=b?b:0},kPa:function(){var a=g(document.activeElement);if(a.hasClass(this.na.$Z)){var b=parseInt(a.attr("data-oj-pagenum"),10),c=this;setTimeout(function(){if(0<=b){var a=b+1,d=b-1,a=c.Vk().find("a[data-oj-pagenum\x3d"+a+"]");null!=a&&0<a.length?a.focus():(d=c.Vk().find("a[data-oj-pagenum\x3d"+d+"]"),null!=d&&0<d.length&&d.focus())}c=b=null},100)}else a.hasClass(this.na.UH)?(c=this,setTimeout(function(){c.Vk().find("."+c.na.Wv).focus();c=null},100)):a.hasClass(this.na.Xv)?
(c=this,setTimeout(function(){var a=c.Vk().find("."+c.na.Xv);a.hasClass(c.vc.Ld)?c.Vk().find("."+c.na.Wv).focus():a.focus();c=null},100)):a.hasClass(this.na.Wv)?(c=this,setTimeout(function(){var a=c.Vk().find("."+c.na.Wv);a.hasClass(c.vc.Ld)?c.Vk().find("."+c.na.Xv).focus():a.focus();c=null},100)):a.hasClass(this.na.XH)?(c=this,setTimeout(function(){c.Vk().find("."+c.na.Xv).focus();c=null},100)):a.hasClass(this.na.qz)&&(c=this,setTimeout(function(){c.Vk().find("."+c.na.qz).focus();c=null},100));this.HA()},
mPa:function(a){a.page!=a.previousPage&&this.HA()},tma:function(){this.xo(0,!1).then(function(){},function(b){a.D.error(b)})},gS:function(){this.HA()},rPa:function(a){this.options.mode==this.$q.mz&&this.tma(a)},Q3:function(b){this.P4(b)?this.options.mode==this.$q.RZ?this.xo(this.li(),!0).then(function(){},function(b){a.D.error(b)}):this.Nna():this.HA()},R3:function(b){if(this.options.mode==this.$q.RZ){if(0<this.ig()&&this.li()>this.ig()-1){this.xo(this.ig()-1,!0).then(function(){},function(b){a.D.error(b)});
return}if(this.P4(b)){this.xo(this.li(),!0).then(function(){},function(b){a.D.error(b)});return}}else if(this.P4(b)){this.Nna();return}this.HA()},BQa:function(b,c){if("value"==c.option){var f=c.value;if(f!=this.li()+1&&!isNaN(f)&&0<f){var f=Math.round(f),h=this;this.page(f-1).then(function(){h=null},function(b){var c=h.R(h.cb.hz);a.D.error(c+"\n"+b);h=null})}}},xo:function(a,b){try{a=parseInt(a,10)}catch(c){return Promise.reject(c)}this.zD=0;this.Sqa();return b?(this.gVa(a),Promise.resolve()):this.Ona(a)},
Ona:function(a){var b=this.Lc(),c=this;return new Promise(function(h,k){if(null!=b){var g=c.pD("is setting page.");b.setPage(a,{pageSize:c.options.pageSize}).then(function(){c.kL(g);g=c=null;h(null)},function(a){c.kL(g);g=c=null;k(a)});b=null}else c=null,h(null)})},cSa:function(){var a=this.options.pageSize;this.zD=this.zD?this.zD+a:a;return this.Mna({startIndex:this.zD,pageSize:a})},Mna:function(a){var b=this.Lc();if(!this.ej()||b.totalSize()>this.zD&&this.ej()){var c=this;return new Promise(function(h,
k){var g=c.pD("is fetching data.");b.fetch(a).then(function(a){c.kL(g);g=c=null;h(a)},function(){c.kL(g);g=c=null;k(null)});b=null})}return Promise.resolve()},Nna:function(){return this.Mna({startIndex:0,pageSize:this.zD+this.options.pageSize})},P4:function(a){if(null==a)return!1;var b=this.Lc(),c=b.getStartItemIndex();this.options.mode==this.$q.mz&&(c=0);var b=b.getEndItemIndex(),h;if(null!=a.index){if(h=a.index,h>=c&&h<=b)return!0}else if(null!=a.indexes){var k;for(k=0;k<a.indexes.length;k++)if(h=
a.indexes[k],h>=c&&h<=b)return!0}return!1},ej:function(){var a=this.Lc();return null!=a&&"actual"==a.totalSizeConfidence()?!0:!1},gVa:function(b){var c=this;this.HE||(this.DA=0,this.HE=Promise.resolve());this.DA++;this.tUa=b;this.HE=this.HE.then(function(){c.DA--;0!=c.DA||c.SI||(c.HE=void 0,c.Ona(c.tUa).then(function(){c=null},function(b){c.DA--;0>=c.DA&&(c.HE=void 0,a.D.error(b),c=null)}))},function(b){c.DA--;0>=c.DA&&(c.HE=void 0,a.D.error(b),c=null)})},HA:function(){var b=this;this.SK||(this.fL=
0,this.SK=Promise.resolve(),this.K6());this.fL++;this.SK=this.SK.then(function(){b.fL--;0==b.fL&&(b.SK=void 0,b.SI||(b.kg(),b._trigger("ready")),b.vL(),b=null)},function(c){b.fL--;0==b.fL&&(b.SK=void 0,a.D.error(c),b.vL(),b=null)})},mVa:function(a,b){var c=this.Lc(),h=this.bE(),k,c=!(null!=c&&(b+a==c.totalSize()&&this.ej()||0==c.totalSize()));if(!h||c)h=this.Vk(),null!=h&&h.empty(),this.KIa(),h=this.fia(),k=-1,null!=a&&(k=b+a),0>k||k<this.options.loadMoreOptions.maxCount?(this.gia(),this.hia(a,b)):
this.gKa();c||h.css("display","none")},nVa:function(a,b){var c=this.options.overflow;this.rVa(a,b);this.qVa();this.pVa();this.tVa(a,b);this.sVa(a,b);this.oVa(a,b);if("fit"==c){var c=this.element.width(),h=this.yla(),k=this.j3(),g=this.XNa(),m=this.WNa(),p=null!=h?h[0].offsetWidth:0,t=null!=k?k[0].offsetWidth:0,k=null!=g?g.width():0,s=null!=m?m.width():0,p=p+t+s;p>c?p-k<=c?g.css("display","none"):p-k-s<=c?(null!=g&&g.css("display","none"),null!=m&&m.css("display","none")):(null!=g&&g.css("display",
"none"),null!=m&&m.css("display","none"),null!=h&&h.css("display","none")):0<p&&(null!=g&&g.css("display",""),null!=m&&m.css("display",""),null!=h&&h.css("display",""))}},oVa:function(a){var b=this.options.pageSize,c=this.yla(),h=c.children("."+this.na.UH);if(h&&0<h.length){var h=g(h[0]),k=this.R(this.cb.sfa);h.attr("title",k);this.PQ(h,0==this.li())}(h=c.children("."+this.na.Xv))&&0<h.length&&(h=g(h[0]),k=this.R(this.cb.wfa),h.attr("title",k),this.PQ(h,0==this.li()));(h=c.children("."+this.na.XH))&&
0<h.length&&(h=g(h[0]),k=this.R(this.cb.ufa),h.attr("title",k),this.PQ(h,this.li()==this.ig()-1||0>=this.ig()||!this.ej()));(c=c.children("."+this.na.Wv))&&0<c.length&&(c=g(c[0]),h=this.R(this.cb.vfa),c.attr("title",h),this.PQ(c,this.li()==this.ig()-1&&this.ej()||0===this.ig()||0>this.ig()&&0===a||0>this.ig()&&a<b))},sVa:function(a,b){var c=this.Dr().find("."+this.na.Oea);null!=c&&0<c.length&&(c=g(c.get(0)),this.DU(c),c.empty(),this.jia(c,this.hla(),a,b))},qVa:function(){var a=this.j3();if(null!=
a&&(a=a.children("."+this.na.Mea),null!=a&&0<a.length)){var a=g(a[0]),b=this.R(this.cb.pea);a.text(b)}},pVa:function(){var a=this.zla();if(null!=a){var b=this.R(this.cb.tfa);a.attr("title",b);a.ojInputText("option","title",b)}},tVa:function(a,b){var c=this.Dr().children("."+this.na.WH);if(null!=c&&0<c.length){var h=this.R2(a,b),c=g(c.get(0));c.empty();0<h.text().length&&(c.append("("),c.append(h),c.append(")"))}},rVa:function(a){a=this.ila(a);var b=this.Dr().find("."+this.na.VH);if(null!=b&&0<b.length)if(b=
g(b.get(0)),0<this.ig()&&this.ej()){var c=this.R(this.cb.CZ,{pageMax:a});b.text(c)}else b.empty();else c=this.j3(),null!=c&&0<this.ig()&&this.ej()&&a>=this.li()+1&&(b=g(document.createElement("span")),b.addClass(this.na.VH),b.addClass("oj-label-inline"),c.append(b),c=this.R(this.cb.CZ,{pageMax:a}),b.text(c));b=this.Dr().find("."+this.na.qz);null!=b&&0<b.length&&(b=g(b.get(0)),b.ojInputText(),b.ojInputText("option","validators",[{type:"numberRange",options:{min:1,max:a}}]),c=b.ojInputText("option",
"messagesShown"),null!=c&&0!=c.length||this.Sqa(),1==a?b.ojInputText("option","readOnly",!0):b.ojInputText("option","readOnly",!1))},LA:function(){var b=this.Lc();if(null!=b){this.aq();this.Nj=[];this.Nj.push({eventType:a.bi.ga.PAGE,eventHandler:this.mPa.bind(this)});this.Nj.push({eventType:a.bi.ga.PAGECOUNT,eventHandler:this.gS.bind(this)});this.Nj.push({eventType:a.tb.ga.ADD,eventHandler:this.Q3.bind(this)});this.Nj.push({eventType:a.tb.ga.REMOVE,eventHandler:this.R3.bind(this)});this.Nj.push({eventType:a.tb.ga.RESET,
eventHandler:this.tma.bind(this)});this.Nj.push({eventType:a.tb.ga.REFRESH,eventHandler:this.gS.bind(this)});this.Nj.push({eventType:a.tb.ga.SYNC,eventHandler:this.kPa.bind(this)});this.Nj.push({eventType:a.tb.ga.SORT,eventHandler:this.rPa.bind(this)});var c,f;for(c=0;c<this.Nj.length;c++)(f=b.on(this.Nj[c].eventType,this.Nj[c].eventHandler))&&(this.Nj[c].eventHandler=f)}},Vp:function(b){if(!this.Wj){var c=this;this.Wj=function(){c.HA()}}this.RT||(a.T.em(b[0],this.Wj,50),this.RT=b)},LE:function(){if(a.T.ke()&&
this.options.mode==this.$q.RZ){var c=this.Dr();if(null!=c){var e=this;if("vertical"==this.options.pageOptions.orientation){var f={recognizers:[[b.Swipe,{direction:b.DIRECTION_VERTICAL}]]};this.M3=c.Tg(f).on("swipeup",function(a){a.preventDefault();e.nextPage()});this.J3=c.Tg(f).on("swipedown",function(a){a.preventDefault();e.previousPage()})}else f={recognizers:[[b.Swipe,{direction:b.DIRECTION_HORIZONTAL}]]},this.K3=c.Tg(f).on("swipeleft",function(a){a.preventDefault();e.nextPage()}),this.L3=c.Tg(f).on("swiperight",
function(a){a.preventDefault();e.previousPage()})}}},Sqa:function(){var a=this.zla();if(null!=a&&a.hasClass("oj-component-initnode"))try{a.ojInputText("option","value",this.li()+1)}catch(b){}},K6:function(){this.Fe||(this.Fe=this.pD("is being loaded."))},vL:function(){this.Fe&&(this.kL(this.Fe),this.Fe=null)},Qra:function(){var b=this.li();0<b?this.xo(b,!0).then(function(){},function(b){a.D.error(b)}):this.xo(0,!0).then(function(){},function(b){a.D.error(b)})},aq:function(){var a=this.Lc();if(null!=
this.Nj&&null!=a){var b;for(b=0;b<this.Nj.length;b++)a.off(this.Nj[b].eventType,this.Nj[b].eventHandler)}},DU:function(a){var b=this;a.find("*").each(function(){b.wz(this)});b=null},vn:function(){null!=this.RT&&(a.T.vm(this.RT,this.Wj),this.RT=null)},EU:function(){a.T.ke()&&("vertical"==this.options.pageOptions.orientation?(null!=this.M3&&(this.M3.off("swipeup"),this.M3=null),null!=this.J3&&(this.J3.off("swipedown"),this.J3=null)):(null!=this.K3&&(this.K3.off("swipeleft"),this.K3=null),null!=this.L3&&
(this.L3.off("swiperight"),this.L3=null)))},e1:function(a,b){var c=g(document.createElement("span"));c.addClass(b);c.addClass(this.na.Um);c.text(a);return c},dKa:function(){var a=this.ih(),b=this.R(this.cb.bEa),b=this.e1(b,this.na.Gea),c=this.element.attr("id")+"_oj_pgCtrl_acc_label";b.attr("id",c);a.append(b);return b},eKa:function(){var a=this.R(this.cb.$Da);return this.e1(a,this.na.cFa)},fKa:function(){var a=this.ih(),b=g(document.createElement("div"));b.addClass(this.na.Hea);var c=this.VNa().attr("id");
b.attr("role","navigation");b.attr("aria-labelledby",c);a.append(b);return b},fia:function(){var a=this.Vk(),b=g(document.createElement("div"));b.addClass(this.na.Iea);a.append(b);return b},gia:function(){var a=this.bE(),b=g(document.createElement("a"));b.addClass(this.na.wP);var c=this.R(this.cb.dEa);b.text(c);b.attr(this.eI,"0");b.attr("href","#");a.append(b);return b},gKa:function(){var a=this.bE(),b=g(document.createElement("span"));b.addClass(this.na.UZ);var c=this.R(this.cb.eEa,{maxRows:this.options.loadMoreOptions.maxCount});
b.text(c);a.append(b);return b},hia:function(a,b){var c=this.bE(),h=g(document.createElement("span"));h.addClass(this.na.xP);var k=this.R2(a,b);h.append(k);c.append(h);return h},iia:function(a,b){var c="vertical"==this.options.pageOptions.orientation?!0:!1,h="dots"==this.options.pageOptions.type?!0:!1,k=this.options.pageOptions.layout;null==k&&(k=[this.Fj.Mm]);var l=this.Vk(),m=g(document.createElement("div"));m.addClass(this.na.Kea);l.append(m);if(-1!=g.inArray(this.Fj.Mm,k)&&!h||-1!=g.inArray(this.Fj.AH,
k)||-1!=g.inArray(this.Fj.RH,k)){l=g(document.createElement("div"));l.addClass(this.na.Lea);m.append(l);var p=g(document.createElement("label"));p.attr("for",this.element.attr("id")+"_nav_input");p.addClass(this.na.Mea);p.addClass("oj-label-inline");var t=this.R(this.cb.pea);p.text(t);l.append(p);p=g(document.createElement("input"));p.addClass(this.na.qz);t=this.R(this.cb.tfa);p.attr("id",this.element.attr("id")+"_nav_input");p.attr("title",t);p.attr(this.eI,"0");p.val(this.li()+1);l.append(p);t=
this.ila(a);if(0<this.ig()&&this.ej()){var s=g(document.createElement("span"));s.addClass(this.na.VH);s.addClass("oj-label-inline");var n=this.R(this.cb.CZ,{pageMax:t});s.text(n);l.append(s)}p.ojInputText({displayOptions:{messages:["notewindow"],converterHint:["notewindow"],validatorHint:["notewindow"]},rootAttributes:{style:"width: auto; min-width: 0;"},optionChange:this.BQa.bind(this),validators:[{type:"numberRange",options:{min:1,max:t}}]}).attr("data-oj-internal","")}if(-1!=g.inArray(this.Fj.Mm,
k)&&!h||-1!=g.inArray(this.Fj.AH,k)||-1!=g.inArray(this.Fj.iFa,k))l=g(document.createElement("span")),l.addClass(this.na.WH),l.addClass("oj-label-inline"),p=this.R2(a,b),0<p.text().length&&(l.append("("),l.append(p),l.append(")")),m.append(l);l=g(document.createElement("div"));l.addClass(this.na.Jea);m.append(l);if(-1!=g.inArray(this.Fj.Mm,k)&&!h||-1!=g.inArray(this.Fj.AH,k)||-1!=g.inArray(this.Fj.wea,k))p=this.FQ(this.na.UH,c?this.na.WEa:this.na.VEa,this.cb.sfa,this.cb.XDa,this.na.UEa,c),l.append(p),
p=this.FQ(this.na.Xv,c?this.na.gFa:this.na.fFa,this.cb.wfa,this.cb.aEa,this.na.eFa,c),l.append(p);if(-1!=g.inArray(this.Fj.Mm,k)||-1!=g.inArray(this.Fj.AH,k)||-1!=g.inArray(this.Fj.OEa,k))p=g(document.createElement("div")),p.addClass(this.na.Oea),l.append(p),this.jia(p,this.hla(),a,b);if(-1!=g.inArray(this.Fj.Mm,k)&&!h||-1!=g.inArray(this.Fj.AH,k)||-1!=g.inArray(this.Fj.wea,k))h=this.FQ(this.na.Wv,c?this.na.bFa:this.na.aFa,this.cb.vfa,this.cb.ZDa,this.na.$Ea,c),l.append(h),c=this.FQ(this.na.XH,c?
this.na.ZEa:this.na.YEa,this.cb.ufa,this.cb.YDa,this.na.XEa,c),l.append(c);return m},jia:function(a,b,c){if(5>b){c=this.R(this.cb.tDa);var h=this.R(this.cb.sDa);throw Error(c+"\n"+h);}h=g(document.createElement("div"));h.addClass(this.na.Nea);a.append(h);var k=this.ig(),l=this.li();a=this.options.pageSize;var m=b;b=[];if(0<=l){if(this.ej()&&k<=m)for(b[0]=0,l=1;l<k;l++)b[l]=l;else{b.push(0);0!=l&&b.push(l);l!=k-1&&this.ej()&&b.push(k-1);var m=m-b.length,p=l-1,t=1;for(!this.ej()||l!=k-1&&l!=k-2||(t=
0);m>t&&1<=p;)b.push(p),p--,m--;l+=1;for(-1==k&&(m=0<c&&c>=a?1:0);0<m&&(l<=k||-1==k);)b.push(l),l++,m--}b.sort(function(a,b){return a-b});for(l=0;l<b.length;l++)k=b[l],this.k1(h,k),l!=b.length-1&&k!=b[l+1]-1&&this.k1(h,-1);!this.ej()&&c>=a&&this.k1(h,-1)}return h},k1:function(a,b){var c=this.li(),h=null,k="rtl"===this.Uc(),l="vertical"==this.options.pageOptions.orientation?!0:!1,m="dots"==this.options.pageOptions.type?!0:!1;if(-1==b)h=g(document.createElement("span")),h.addClass(this.na.dFa),h.text("...");
else{c==b?(h=g(document.createElement("div")),h.addClass(this.vc.hg),h.addClass(this.vc.zj),h.addClass(this.vc.Ld),h.removeClass(this.vc.Vq)):(h=g(document.createElement("a")),h.removeClass(this.vc.hg),h.removeClass(this.vc.zj),h.removeClass(this.vc.Ld),h.addClass(this.vc.Vq),h.attr(this.eI,"0"),h.attr("href","#"));h.attr("data-oj-pagenum",b);m?h.addClass(this.na.TEa):h.addClass(this.na.$Z);var p=this.R(this.cb.UFa,{pageNum:(b+1).toString()});this.xg(h);this._focusable({element:h,applyHighlight:!0});
h.attr("title",p);h.attr("oncontextmenu","return false;");p=this.eKa();h.append(p);p=g(document.createElement("span"));p.append((b+1).toString());m?(p.addClass(this.na.Um),m=g(document.createElement("span")),m.addClass(this.na.SEa),this.xg(m),c==b&&(m.addClass(this.vc.hg),m.addClass(this.vc.zj)),h.append(m)):this.xg(h);p.attr("dir",k?"rtl":"ltr");h.append(p);l&&h.css("display","block")}a.append(h);return h},VNa:function(){var a=this.ih(),b=null;a&&(b=a.find("."+this.na.Gea))&&0<b.length&&(b=g(b.get(0)));
return b},ih:function(){return g(this.element)},Vk:function(){if(!this.Rga){var a=this.ih(),b=null;a&&(b=a.find("."+this.na.Hea))&&0<b.length&&(this.Rga=g(b.get(0)))}return this.Rga},bE:function(){if(!this.p0){var a=this.Vk(),b=null;a&&(b=a.children("."+this.na.Iea))&&0<b.length&&(this.p0=g(b.get(0)))}return this.p0},N7a:function(){if(!this.q0){var a=this.bE(),b=null;a&&(b=a.children("."+this.na.wP))&&0<b.length&&(this.q0=g(b.get(0)))}return this.q0},O7a:function(){if(!this.r0){var a=this.bE(),b=
null;a&&(b=a.children("."+this.na.xP))&&0<b.length&&(this.r0=g(b.get(0)))}return this.r0},Dr:function(){if(!this.s0){var a=this.Vk(),b=null;a&&(b=a.children("."+this.na.Kea))&&0<b.length&&(this.s0=g(b.get(0)))}return this.s0},zla:function(){if(!this.t0){var a=this.Dr(),b=null;a&&(b=a.find("."+this.na.qz))&&0<b.length&&(this.t0=g(b.get(0)))}return this.t0},WNa:function(){if(!this.u0){var a=this.Dr(),b=null;a&&(b=a.find("."+this.na.WH))&&0<b.length&&(this.u0=g(b.get(0)))}return this.u0},XNa:function(){var a=
this.Dr(),b=null;a&&(b=a.find("."+this.na.Nea))&&0<b.length&&(b=g(b.get(0)));return b},yla:function(){var a=this.Dr(),b=null;if(a)if((b=a.find("."+this.na.Jea))&&0<b.length)b=g(b.get(0));else return null;return b},j3:function(){var a=this.Dr(),b=null;if(a)if((b=a.find("."+this.na.Lea))&&0<b.length)b=g(b.get(0));else return null;return b}})})();a.J.Ua("oj-paging-control","baseComponent",{properties:{data:{},loadMoreOptions:{type:"Object",properties:{maxCount:{type:"number"}}},mode:{type:"string",enumValues:["page",
"loadMore"]},overflow:{type:"string",enumValues:["fit","none"]},pageOptions:{type:"Object",properties:{layout:{type:"Array\x3cstring\x3e"},maxPageLinks:{type:"number"},orientation:{type:"string",enumValues:["horizontal","vertical"]},type:{type:"string",enumValues:["numbers","dots"]}}},pageSize:{type:"number"}},methods:{firstPage:{},lastPage:{},loadNext:{},nextPage:{},page:{},previousPage:{}},extension:{Xa:"ojPagingControl"}});a.J.register("oj-paging-control",{metadata:a.J.getMetadata("oj-paging-control")})});