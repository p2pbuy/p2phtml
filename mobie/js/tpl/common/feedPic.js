define("tpl/common/feedPic", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (mblog) {
var aRet = [];if (!mblog|| typeof mblog!= "object" ) return "";if(mblog.thumbnail_pic){aRet.push('    ');if(mblog.pic_ids.length === 1){aRet.push('        <div class="media-pic">            <img data-src="'+(mblog.pics[0].url)+'"');if(mblog.pics[0].geo){aRet.push(' width="'+(mblog.pics[0].geo.width)+'" height="'+(mblog.pics[0].geo.height)+'"');}aRet.push(' data-node="pic" data-act-type="hover">        </div>    ');}else{aRet.push('    <div class="media-pic-list');if(mblog.pic_ids.length === 4){aRet.push(' type-scube');}aRet.push('">        <ul>            ');if(mblog.pics && mblog.pics.constructor === Array){with({i:0,l:mblog.pics.length,pic_index:0,pic:null}){for(i=l;i--;){pic_index=(l-i-1);pic=mblog.pics[pic_index];aRet.push('                <li><img data-src="'+(pic.url)+'" data-node="pic" data-act-type="hover"></li>            ');}}}aRet.push('        </ul>    </div>  ');}}return aRet.join("");
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
