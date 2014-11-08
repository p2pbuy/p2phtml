define("tpl/card/card30", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-3 头像文字混排两行两字段 (card30)@category User + Text - 头像文字混排类@readme 头像文字混排两行两字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card30 line-around" data-node="card" data-jump="'+(data.scheme || data.openurl || '')+'" data-act-type="hover">    <div class="layout-box media-graphic">         <div class="mod-media size-m">            <div class="media-main">                <img src="'+(data.user.profile_image_url)+'" data-node="cImgUsr" height="64" width="64"/>                    ');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.user);})());aRet.push('            </div>        </div>          <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut" data-node="cNameUsr">'+(data.user.screen_name)+'                ');if(data.user.mbtype && (data.user.mbtype === 11 || data.user.mbtype === 12 || data.user.mbtype === 13 || data.user.mbtype === 14)){aRet.push('                <a data-node="cIconLink" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data.user);})());aRet.push(' data-act-type="hover" class="btn btn-vip"><i class="icon icon-vip"></i>                ');}else{aRet.push('                <a data-node="cIconLink" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data.user);})());aRet.push(' data-act-type="hover" class="btn btn-nvip"><i class="icon icon-nvip"></i>                ');}aRet.push('                <i class="icon-font icon-font-arrow-right"></i>                </a>            </div>            ');if(data.desc1){aRet.push('            <div class="item-minor txt-s mct-d" data-node="cTxtUsr">'+(data.desc1)+'</div>            ');}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('         ');}}}aRet.push('         ');}aRet.push('    </div></div>');return aRet.join("");
}
});
/* PATH: src/js/sdk/tplutil.js */
define("sdk/tplutil", function(require, exports, module) {

/**
 * @fileoverview 去除字符串收尾空格
 * @author Tapir | baokun@staff.sina.com.cn
 * @date 2013-07-12
 * @param {string} *str 目标字符串。
 * @return {string} 去除收尾空格后的字符串
 */

exports.trim = (function() {
	'use strict';
	var startWhitespacesPattern = new RegExp('^[' + WHITESPACES + ']+');
	var endWhitespacesPattern = new RegExp('[' + WHITESPACES + ']+$');
	var WHITESPACES = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF';
	
	function trim(str) {
		return str.replace(startWhitespacesPattern, '').replace(endWhitespacesPattern, '');
	}
	
	function nativeMethod(str) {
		return  String.prototype.trim.call(str);
	}
	
	return String.prototype.trim ? nativeMethod : trim;
})();

});

define("tpl/common/verified", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (user) {
var aRet = [];if (!user|| typeof user!= "object" ) return "";if(user.verified === true && ('verified_type' in user) && user.verified_type == 0){aRet.push('<i class="icon icon-yellowv" data-node="cIconUsr"></i>');}else if(user.verified === true && ('verified_type' in user) && user.verified_type > 0 && user.verified_type < 8){aRet.push('<i class="icon icon-bluev" data-node="cIconUsr"></i>');}else if(user.verified === false && ('verified_type' in user) && user.verified_type == 220){aRet.push('<i class="icon icon-club" data-node="cIconUsr"></i>');}else if(user.verified === false && user.level && user.level == 10){aRet.push('<i class="icon icon-vgirl" data-node="cIconUsr"></i>');}else if(user.verified === false && user.level && user.level === 2){aRet.push('<i class="icon icon-vip" data-node="cIconUsr"></i>');}return aRet.join("");
}
});
define("tpl/common/openTarget", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push(' href="'+((data.urls && data.urls.h5) || data.scheme || data.openurl || 'javascript:;')+'" ');return aRet.join("");
}
});
define("tpl/common/arrowRight", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";if(data.display_arrow && data.display_arrow === 1){aRet.push('<span data-node="arrow" class="plus plus-s"><i class="icon-font icon-font-arrow-right txt-s"></i></span>');}return aRet.join("");
}
});
define("tpl/common/button", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (btn) {
var aRet = [];if (!btn|| typeof btn!= "object" ) return "";aRet.push('<a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(btn);})());aRet.push('  ');if( btn.type && (btn.type === "like" || btn.type === "follow")){aRet.push('   data-act-type="hover '+(btn.type)+'" data-act-data="sub_type='+(btn.sub_type)+'"  ');}aRet.push('  ');if(btn.type === "default" && btn.params && btn.params.action){aRet.push('   data-act-type="hover btn_default" data-act-data="action='+(btn.params.action)+'"  ');}aRet.push('><div class="mod-operate">    <div class="operate-inner line-left">    <div class="inner">        ');if( btn.type && btn.type === "like"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon icon-liked"></i>            ');}else{aRet.push('            <i class="icon icon-like"></i>            ');}aRet.push('        ');}else if( btn.type && btn.type === "follow"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon-font icon-font-followed"></i>            <div data-node="cImgTxt" class="txt-xxs" style="color:#AAA">已关注</div>            ');}else{aRet.push('            <i class="icon-font icon-font-follow"></i>            <div data-node="cImgTxt" class="txt-xxs">加关注</div>            ');}aRet.push('        ');}else{aRet.push('            ');if(btn.pic){aRet.push('            <img data-node="cImgPic" src="'+(btn.pic)+'" height="24" width="24"/>            ');}aRet.push('            <div data-node="cImgTxt" class="txt-xxs" >'+(btn.name)+'</div>        ');}aRet.push('        </div>    </div></div></a>');return aRet.join("");
}
});