/* PATH: src/js/card/cards.js */
define("card/cards", function(require, exports, module) {
///contains('card/.+');
});

/* PATH: src/js/card/card1.js */
define("card/card1", function(require, exports, module) {
module.exports = function(box, data, commonData) {
	console.log(box, data.card_type);
};

});

/* PATH: src/js/card/card10.js */
define("card/card10", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

/* PATH: src/js/card/card11.js */
define("card/card11", function(require, exports, module) {
;(function() {
	var currentActive = void 0;
    function dirFirstElement(s_el, dir, con, e_el , fun) {
        var matched = void 0, truncate = e_el !== void 0;
        while (s_el && s_el.nodeType !== 9) {
            if (s_el.nodeType === 1) {
                if ( $(s_el).is(con) || (truncate && $(s_el).is(e_el)) ){
                	matched = s_el;
                	fun();
                    break;
                }
            }
            s_el = s_el[dir];
        }
        return matched;
    };
	function remove(){
		currentActive && $(currentActive).css('background','');
		currentActive = void 0;
	};

	$(document).on('touchstart', function(e) {
		currentActive = dirFirstElement(e.target, 'parentNode', "[data-active='1']", "div[data-node='card']", remove);
		currentActive && $(currentActive).css('background','#ddd');
	});
	$(document).on('touchend touchmove', remove);
}());

module.exports = function (box, data, commonData) {
};


});

/* PATH: src/js/card/card19.js */
define("card/card19", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

/* PATH: src/js/card/card2.js */
define("card/card2", function(require, exports, module) {

module.exports = function(box, data, commonData) {
	console.log(box, data.card_type);
};
});

/* PATH: src/js/card/card21.js */
define("card/card21", function(require, exports, module) {
module.exports = function (box, data, commonData) {
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
};
});

/* PATH: src/js/card/card22.js */
define("card/card22", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

/* PATH: src/js/card/card25.js */
define("card/card25", function(require, exports, module) {
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

/* PATH: src/js/card/card26.js */
define("card/card26", function(require, exports, module) {
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

/* PATH: src/js/card/card27.js */
define("card/card27", function(require, exports, module) {
module.exports = function (box, data, commonData) {
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

/* PATH: src/js/card/card29.js */
define("card/card29", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

/* PATH: src/js/card/card3.js */
define("card/card3", function(require, exports, module) {

module.exports = function(box, data, commonData) {
	console.log(box, data.card_type);
};
});

/* PATH: src/js/card/card30.js */
define("card/card30", function(require, exports, module) {
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

/* PATH: src/js/card/card32.js */
define("card/card32", function(require, exports, module) {
module.exports = function (box, data, commonData) {
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
};
});

/* PATH: src/js/card/card6.js */
define("card/card6", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

/* PATH: src/js/card/card7.js */
define("card/card7", function(require, exports, module) {
module.exports = function (box, data, commonData) {
};
});

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
