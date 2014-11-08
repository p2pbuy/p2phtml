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
