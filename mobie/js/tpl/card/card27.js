define("tpl/card/card27", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-6 大图推广 (card27)@category Picture + Text - 图片文字混排类@readme 大图推广 ---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card27 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    ');if(data.title_sub || data.pic || data.desc){aRet.push('    <div class="main-content">        ');if(data.title_sub){aRet.push('        <h4 class="title mct-b txt-l" data-node="cTitle">'+(data.title_sub)+'</h4>        ');}aRet.push('        ');if(data.pic){aRet.push('        <div class="media-pic">            <img src="'+(data.pic)+'" data-node="cImg" alt="">        </div>         ');}aRet.push('         ');if(data.desc){aRet.push('        <div class="media-txt txt-xs" data-node="cDesc">            '+(data.desc)+'        </div>        ');}aRet.push('    </div>    ');}aRet.push('    ');if(data.buttons && data.buttons.length){aRet.push('    <footer class="more-detail line-top ');if(data.buttons.length>1){aRet.push('layout-box');}aRet.push('">        ');if(data.buttons.length >1){aRet.push('            ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            <a data-active="1" href="'+((btn.params && btn.params.scheme)?btn.params.scheme:(btn.params && btn.params.openurl)?btn.params.openurl:'javascript:void(0);')+'" class="box-col ');if((btn_index + 1) !== data.buttons.length){aRet.push('line-right');}aRet.push(' txt-s" data-node="cImgTxtLink" ');if(btn.type){aRet.push('data-type="'+(btn.type)+'"');}aRet.push('>                ');if( btn.type && btn.type === "like"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-liked"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-like"></i>                    ');}aRet.push('                ');}else if( btn.type && btn.type === "forward"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-forwarded"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-forward"></i>                    ');}aRet.push('                ');}else if( btn.type && btn.type === "dots"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-dotsed"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-dots"></i>                    ');}aRet.push('                ');}else{aRet.push('                    <i class="iconimg iconimg-xs">                        <img data-node="cImgPic" src="'+(btn.pic)+'" alt="" />                    </i>                ');}aRet.push('                ');if(btn.name){aRet.push('                <em class="num mct-d">'+(btn.name)+'</em>                ');}aRet.push('            </a>            ');}}}aRet.push('        ');}else{aRet.push('            ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            <a data-active="1" data-node="cImgTxtLink" href="'+((btn.params && btn.params.scheme)?btn.params.scheme:(btn.params && btn.params.openurl)?btn.params.openurl:'javascript:void(0);')+'" class="mct-d txt-m">'+(btn.name)+'            ');if(data.display_arrow && data.display_arrow === 1){aRet.push('            <i class="icon-font icon-font-arrow-down"></i>            ');}aRet.push('            </a>            ');}}}aRet.push('        ');}aRet.push('    </footer>    ');}aRet.push('</div>');return aRet.join("");
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
