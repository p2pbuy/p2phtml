/* PATH: src/js/card/card8.js */
define("card/card8", function(require, exports, module) {
module.exports = function (box, data, commonData) {
    var isDoned = false;
    function dirFirstElement(s_el, dir, con, e_el) {
        var matched = void 0, truncate = e_el !== void 0;
        while (s_el && s_el.nodeType !== 9) {
            if (s_el.nodeType === 1) {
                if (truncate && $(s_el).is(e_el)) {
                    break;
                }
                if($(s_el).is(con)){
                    matched = s_el;
                    break;
                }  
            }
            s_el = s_el[dir];
        }
        return matched;
    };
    $(box).on('click',function(e){
         var target = dirFirstElement(e.target, 'parentNode', 'a', "div[data-node='card']");
         if(!target){
            var attr = $(box).attr("data-jump");
            if(attr && attr !== 'javascript:void(0)' && attr !== 'javascript:void(0);'){
                window.location.href = attr;
            }
         }
    });
    // 有a跳转地址
    // 有a执行绑定事件处理
    $("a[data-node='cImgTxtLink'][data-type^='like']",box).on('click',function(){
        if (isDoned) return;
        isDoned = true;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: data.buttons.params.action,
            data: {
                uid: commonData['uid']
            }
        }).done(function(res) {
            if (res.code === "100000") {
                var $this = this;
                var likeBtn = $('i.icon',$this);
                likeBtn.css('webkitAnimation','pulse 0.44s ease both');
                likeBtn.on('webkitAnimationEnd',function(){
                    likeBtn.css('webkitAnimation','');
                    likeBtn.off('webkitAnimationEnd',arguments.callee);
                });
                likeBtn.toggleClass("icon-like");
                likeBtn.toggleClass("icon-liked");
            } else {}
            isDoned = false;
        }).fail(function() {
            isDoned = false;
        });
    });
};
});
