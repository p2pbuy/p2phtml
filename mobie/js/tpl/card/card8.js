define("tpl/card/card8", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-2 图像文字混排三行三字段 (card8)@category Picture + Text - 图片文字混排类@readme 图像文字混排三行三字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card8 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    ');if(data.title){aRet.push('        <h4 class="title mct-a txt-xs">'+(data.title)+'</h4>    ');}aRet.push('    <div class="layout-box media-graphic">        ');if(data.pic){aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="'+(data.pic)+'" height="64" width="64"></div>         </div>        ');}aRet.push('             <div class="box-col item-list">            ');if(data.title_sub){aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">'+(data.title_sub)+'</div>            ');}aRet.push('            ');if(data.desc1){aRet.push('            <div class="item-minor txt-s mct-d txt-cut" data-node="cDesc">'+(data.desc1)+'</div>            ');}aRet.push('            ');if(data.desc2){aRet.push('            <div class="item-other txt-s mct-d txt-cut" data-node="cDesc">'+(data.desc2)+'</div>            ');}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('        ');}}}aRet.push('        ');}aRet.push('    </div></div>');return aRet.join("");
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
define("tpl/common/openTarget", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push(' href="'+((data.urls && data.urls.h5) || data.scheme || data.openurl || 'javascript:;')+'" ');return aRet.join("");
}
});