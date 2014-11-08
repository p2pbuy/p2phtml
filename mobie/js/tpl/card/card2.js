define("tpl/card/card2", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title S-3 Applist (card2)@category Special - 特殊类型@readme 双列式（可扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card2 line-around">    <div class="layout-box">        ');if(data.apps && data.apps.constructor === Array){with({i:0,l:data.apps.length,app_index:0,app:null}){for(i=l;i--;){app_index=(l-i-1);app=data.apps[app_index];aRet.push('            <a class="box-col line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(app);})());aRet.push(' data-act-type="hover">                ');if(app.count){aRet.push('                <div class="mct-a txt-s">'+(app.count)+'</div>                ');}aRet.push('                <div class="mct-a txt-s txt-bottom">'+(app.title)+'</div>            </a>            ');if(data.apps.length > 5){aRet.push('                ');if(app_index == 3){aRet.push('                    <a href="javascript:;" data-act-type="hover" node-type="more" class="box-col line-separate">                        <div class="mct-s txt-s"><i class="icon-font icon-font-arrow-down txt-m"></i></div>                        <div class="mct-a txt-s txt-bottom">更多</div>                    </a>                    <div node-type="pop-list" style="display:none;">                        <div class="layout-box">                ');}aRet.push('                ');if(app_index >= 3){aRet.push('                    ');if(app_index == data.apps.length - 1){aRet.push('                        </div></div>                    ');}else if(app_index != 3 && (app_index - 3) % 4 === 0){aRet.push('                        </div><div class="layout-box" data-index="'+(app_index)+'">                    ');}aRet.push('                ');}aRet.push('            ');}aRet.push('        ');}}}aRet.push('    </div></div>');return aRet.join("");
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