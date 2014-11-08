define("tpl/mod/module_comment", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title Comment评论 (mod module_comment)@category Module - 自定义模块@readme Comment评论 ---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="module module_comment"><div class="info-bar"><div class="layout-box"><div class="box-col"><span class="info-txt mct-d">'+(data.forward_count||"")+'转发</span><span class="line-right"></span><span class="info-txt mct-a">'+(data.comment_count||"")+'评论<span class="arrow-up line-top"><em class="arrow-up-in line-left"></em></span></span></div><div class="plus"><span class="info-txt mct-d" action-type="like">'+(data.like_count||"")+'赞</span></div></div></div><div class="line-around comment-box">');if(data.comment_list.length){aRet.push('<ul class="comment-list line-top">');if(data.comment_list && data.comment_list.constructor === Array){with({i:0,l:data.comment_list.length,comment_index:0,comment:null}){for(i=l;i--;){comment_index=(l-i-1);comment=data.comment_list[comment_index];aRet.push('<li class="layout-box media-graphic line-bottom">             <div class="mod-media size-xs">                <div class="media-main"><img src="'+(comment.user.profile_image_url)+'" height="34" width="34"></div>');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(comment.user);})());aRet.push('            </div>            <div class="box-col item-list">                <div class="item-main txt-xs mct-a txt-cut">'+(comment.user.screen_name)+'</div>                <div class="item-minor txt-xs">                '+(comment.content)+'                </div>                <div class="item-other txt-xxs mct-d txt-cut"><span class="time">'+(comment.time)+'</span><span class="from">来自'+(comment.from)+'</span></div>                        </div>            <span class="operate-box">            <em class="line-around btn-more mct-d"><span class="icon-font icon-font-dots"></span></em>            </span>        </li>');}}}aRet.push('</ul>');}else{aRet.push('<div class="zero-box line-top"><i class="icon-font icon-font-comment"></i><p class="mct-d txt-s">还没有人评论</p></div>');}aRet.push('</div></div>');return aRet.join("");
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