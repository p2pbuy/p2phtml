define("tpl/card/card3", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-1 单行4张（单触区）(card3)@category Picture - 图片类@readme 单行4张（单触区）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card3 line-around">    ');if(data.title){aRet.push('        <h4 class="title mct-a txt-xs">'+(data.title)+'</h4>    ');}aRet.push('    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col layout-box">            ');if(data.pics && data.pics.constructor === Array){with({i:0,l:data.pics.length,item_index:0,item:null}){for(i=l;i--;){item_index=(l-i-1);item=data.pics[item_index];aRet.push('                ');if(item_index < 4){aRet.push('                    <div class="mod-media size-m">                        <div class="media-main">                            <img src="'+(item.pic)+'" height="64" width="64">                        </div>                        ');if(item.desc1){aRet.push('                            <div class="media-txt txt-s mct-a txt-cut">'+(item.desc1)+'</div>                        ');}aRet.push('                    </div>                ');}aRet.push('            ');}}}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
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