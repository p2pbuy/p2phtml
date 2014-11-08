/* PATH: src/js/mod/mods.js */
define("mod/mods", function(require, exports, module) {
///contains('mod/.+');
});

/* PATH: src/js/mod/module_comment.js */
define("mod/module_comment", function(require, exports, module) {
/**
 * 评论逻辑测试实例
 */
var $ = require('jquery');

module.exports = function(box, data) {
	
    $(box).on('click', '[action-type="like"]', function() {
		data.like_count++;
		$(this).text(data.like_count + '赞');
    	alert('您点中了赞。。。。。谢谢。。。。当前次数(' + (data.like_count) + ').');
    });
	
	return {
		destroy: function() {
			$(box).off();
		}
	}
};

});
