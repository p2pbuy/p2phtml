define("tpl/card/card9", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card9 line-around" data-act-type="hover">    ');if(data.mblog.deleted == 1){aRet.push('        <section class="weibo-detail" style="padding:10px">            <p class="default-content">'+(data.mblog.text)+'</p>        </section>    ');}else{aRet.push('        ');if(data.mblog.isTop || (data.mblog.visible && data.mblog.visible.type)){aRet.push('        <div class="line-around head-bar">            <h3 class="title mct-d txt-xs">');if(data.mblog.isTop){aRet.push('置顶');}else{aRet.push('              ');if(data.mblog.visible.type == 1){aRet.push('自己可见');}else if(data.mblog.visible.type == 3){aRet.push('分组可见');}else if(data.mblog.visible.type == 6){aRet.push('好友圈');}aRet.push('            ');}aRet.push('</h3>            <i class="icon-font icon-font-arrow-down txt-s"></i>        </div>        ');}aRet.push('        <header class="layout-box media-graphic">            <a href="'+(data.mblog.user.profile_url)+'" class="mod-media size-xs">                <div class="media-main"><img src="'+(data.mblog.user.profile_image_url)+'" height="34" width="34">');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.mblog.user);})());aRet.push(' </div>            </a>            <div class="box-col item-list">                <a href="'+(data.mblog.user.profile_url)+'" class="item-main txt-m mct-a txt-cut">'+(data.mblog.user.screen_name)+'</a>                <div class="item-minor txt-xxs mct-d txt-cut"><span class="time">'+(data.mblog.created_at)+'</span><span class="from">来自'+(data.mblog.source)+'</span></div>            </div>            ');if(!data.hideoperate && !data.hidebtns && !data.mblog.isTop && (!data.mblog.visible || !data.mblog.visible.type)){aRet.push('            <a class="operate-box" data-act-type="hover">                <i class="icon-font icon-font-arrow-down txt-s"></i>            </a>            ');}aRet.push('        </header>        <section class="weibo-detail">            <p class="default-content">'+(data.mblog.text)+'</p>            ');aRet.push((function(){var tpl = require("tpl/common/feedPic");return tpl(data.mblog);})());aRet.push('            ');if(data.mblog.retweeted_status){aRet.push('            <div class="extend-content" data-act-type="hover">                <div class="inner">                    <p class="weibo-original txt-m"><a href="'+(data.mblog.retweeted_status.user.profile_url)+'" class="">@'+(data.mblog.retweeted_status.user.screen_name)+'：</a>'+(data.mblog.retweeted_status.text)+'</p>                    ');aRet.push((function(){var tpl = require("tpl/common/feedPic");return tpl(data.mblog.retweeted_status);})());aRet.push('                </div>            </div>            ');}aRet.push('            <!--            ');if(!data.mblog.retweeted_status && data.mblog.page_info){aRet.push('              <div class="card card8 line-all obj-'+(data.mblog.page_info.object_type)+'">                  <div class="layout-box media-graphic">                      ');if(data.mblog.page_info.page_pic){aRet.push('                          ');if(data.mblog.page_info.media_info){aRet.push('                            <a class="mod-media size-m" href="'+(data.mblog.page_info.media_info.h5_url)+'">                                <div class="media-main">                                  <img src="'+(data.mblog.page_info.page_pic)+'" height="64" width="64">                                </div>                            </a>                          ');}else{aRet.push('                            <div class="mod-media size-m">                                <div class="media-main">                                  <img src="'+(data.mblog.page_info.page_pic)+'" height="64" width="64">                                </div>                            </div>                          ');}aRet.push('                      ');}aRet.push('                      <div class="box-col item-list">                          <div class="item-main txt-m mct-a txt-cut">'+(data.mblog.page_info.page_title)+'</div>                          <div class="item-minor txt-s mct-d txt-cut">'+(data.mblog.page_info.page_desc)+'</div>                          ');if(data.mblog.page_info.tips){aRet.push('                            <div class="item-other txt-s mct-d txt-cut">'+(data.mblog.page_info.tips)+'</div>                          ');}aRet.push('                      </div>                  </div>              </div>            ');}aRet.push('            -->        </section>        ');if(!data.hidebtns){aRet.push('        <footer class="more-detail line-top layout-box box-center-v">            ');if(data.mblog.visible.type == 0){aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="forward"><i class="icon-font icon-font-forward"></i><em class="num mct-d">');if(data.mblog.reposts_count){aRet.push(''+(data.mblog.reposts_count)+'');}else{aRet.push('转发');}aRet.push('</em></a>            <i class="line-gradient"></i>            ');}aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="comment"><i class="icon-font icon-font-comment"></i><em class="num mct-d">');if(data.mblog.comments_count){aRet.push(''+(data.mblog.comments_count)+'');}else{aRet.push('评论');}aRet.push('</em></a>            <i class="line-gradient"></i>            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="like"><i class="icon icon-like');if(data.mblog.attitudes_status==1){aRet.push('d');}aRet.push('small"></i><em class="num mct-d">');if(data.mblog.attitudes_count){aRet.push(''+(data.mblog.attitudes_count)+'');}else{aRet.push('赞');}aRet.push('</em></a>        </footer>        ');}aRet.push('    ');}aRet.push('</div>');return aRet.join("");
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
define("tpl/common/feedPic", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (mblog) {
var aRet = [];if (!mblog|| typeof mblog!= "object" ) return "";if(mblog.thumbnail_pic){aRet.push('    ');if(mblog.pic_ids.length === 1){aRet.push('        <div class="media-pic">            <img data-src="'+(mblog.pics[0].url)+'"');if(mblog.pics[0].geo){aRet.push(' width="'+(mblog.pics[0].geo.width)+'" height="'+(mblog.pics[0].geo.height)+'"');}aRet.push(' data-node="pic" data-act-type="hover">        </div>    ');}else{aRet.push('    <div class="media-pic-list');if(mblog.pic_ids.length === 4){aRet.push(' type-scube');}aRet.push('">        <ul>            ');if(mblog.pics && mblog.pics.constructor === Array){with({i:0,l:mblog.pics.length,pic_index:0,pic:null}){for(i=l;i--;){pic_index=(l-i-1);pic=mblog.pics[pic_index];aRet.push('                <li><img data-src="'+(pic.url)+'" data-node="pic" data-act-type="hover"></li>            ');}}}aRet.push('        </ul>    </div>  ');}}return aRet.join("");
}
});