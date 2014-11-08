define("tpl/card/card10", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card10 line-around" data-act-type="hover">    <div class="layout-box media-graphic">        <div class="mod-media size-m">            <div class="media-main">                <img src="'+(data.user.profile_image_url)+'" data-node="cImgUsr" height="64" width="64"/>                ');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.user);})());aRet.push('            </div>        </div>        <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut');if(!data.desc1){}aRet.push('">'+(data.user.screen_name)+'</div>            <div class="item-minor txt-s mct-d txt-cut');if(!data.desc2){}aRet.push('">'+(data.desc1)+'</div>            ');if(data.desc2){aRet.push('                <div class="item-other txt-s mct-d txt-cut">'+(data.desc2)+'</div>            ');}aRet.push('        </div>        ');if(data.buttons||(data.user&&data.user.buttons)){aRet.push('        ');if((data.buttons||(data.user&&data.user.buttons)) && (data.buttons||(data.user&&data.user.buttons)).constructor === Array){with({i:0,l:(data.buttons||(data.user&&data.user.buttons)).length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=(data.buttons||(data.user&&data.user.buttons))[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('        ');}}}aRet.push('        ');}aRet.push('    </div></div>');return aRet.join("");
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
define("tpl/common/button", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (btn) {
var aRet = [];if (!btn|| typeof btn!= "object" ) return "";aRet.push('<a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(btn);})());aRet.push('  ');if( btn.type && (btn.type === "like" || btn.type === "follow")){aRet.push('   data-act-type="hover '+(btn.type)+'" data-act-data="sub_type='+(btn.sub_type)+'"  ');}aRet.push('  ');if(btn.type === "default" && btn.params && btn.params.action){aRet.push('   data-act-type="hover btn_default" data-act-data="action='+(btn.params.action)+'"  ');}aRet.push('><div class="mod-operate">    <div class="operate-inner line-left">    <div class="inner">        ');if( btn.type && btn.type === "like"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon icon-liked"></i>            ');}else{aRet.push('            <i class="icon icon-like"></i>            ');}aRet.push('        ');}else if( btn.type && btn.type === "follow"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon-font icon-font-followed"></i>            <div data-node="cImgTxt" class="txt-xxs" style="color:#AAA">已关注</div>            ');}else{aRet.push('            <i class="icon-font icon-font-follow"></i>            <div data-node="cImgTxt" class="txt-xxs">加关注</div>            ');}aRet.push('        ');}else{aRet.push('            ');if(btn.pic){aRet.push('            <img data-node="cImgPic" src="'+(btn.pic)+'" height="24" width="24"/>            ');}aRet.push('            <div data-node="cImgTxt" class="txt-xxs" >'+(btn.name)+'</div>        ');}aRet.push('        </div>    </div></div></a>');return aRet.join("");
}
});
define("tpl/common/openTarget", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push(' href="'+((data.urls && data.urls.h5) || data.scheme || data.openurl || 'javascript:;')+'" ');return aRet.join("");
}
});