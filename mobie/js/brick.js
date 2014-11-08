/**
 * requirelite
 */
(function(global) {

    var toString = Object.prototype.toString;

    var defineList = {
        'require': true
    };

    var realList = {};

    var defineConfig = {
        'baseUrl': './',
        'paths': {}
        // ,'mainId': 'main'
    };



    function log() {
        defineConfig.debug && console.log.apply(console, arguments);
    }

    // 运行define列表并返回实例集
    function pkg_runer(pkg) {
        log('%cpkg_runner', 'color:green;font-size:20px;');
        var i, len;
        var name, task, module;
        var once = [];

        for (i = 0, len = pkg.length; i < len; i++) {
            name = pkg[i];
            if (name == 'require') {
                once.push(local_require(name));
                continue;
            }
            task = defineList[name];
            // 如果对应的名字未define
            if (!task) {
                once.push(undefined);
            } else {
                if (!realList[name]) {
                    module = {
                        exports: {}
                    };
                    realList[name] = task.apply(this, [local_require(name), module.exports, module]) || module.exports;
                }
                once.push(realList[name]);
            }
        }
        return once;
    }
    // 内部require
    function local_require(name) {
        log('local_require', name);
        var basePath = name.substr(0, name.lastIndexOf('/') + 1);

        require.isdefined = isdefined;

        require.config = require_config;

        return require;

        function require(id) {

            if (toString.call(id).toLowerCase().indexOf('array') != -1) {
                return global_require.apply(this, arguments);
            }

            log('aaaaaaa', basePath, id);

            if (id.indexOf('.') == 0) {
                id = (basePath + id).replace(/\/\.\//, '/');
            }
            while (id.indexOf('../') != -1) {
                id = id.replace(/\w+\/\.\.\//, '');
            }

            log('%clocal_require', 'color:green;font-size:20px;');
            if (!defineList[id]) {
                throw '[' + id + '] 依赖未定义!';
            }
            if (!realList[id]) {
                pkg_runer([id]);
            }
            return realList[id];
        }
    }
    // 全局加载器
    function global_loader(pkg, cb, errorcb) {
        log('%cglobal_loader', 'color:green;font-size:20px;');
        var i, len;
        var loaded = 0;
        var list = [];
        var path;
        var error = false;
        var error_list = [];

        function check() {
            log('%cloaded:%s, total:%s', 'color:green;font-size:20px;', loaded, pkg.length);
            if (pkg.length == loaded) {
                if (error) {
                    errorcb && errorcb();
                    throw '以下文件加载失败\n\n' + error_list.join('\n') + '\n\n';
                } else {
                    cb();
                }
            }
        }

        function loader(src) {
            var script;
            script = document.createElement('script');
            script.src = src;

            script.onerror = function() {
                error = true;
                error_list.push(script.src);
                loaded += 1;
                check();
            };
            script.onload = script.onreadystatechange = function() {
                // 如果没有readyState也跳过
                if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                    loaded += 1;
                    check();
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        // 循环异步加载远端
        for (i = 0, len = pkg.length; i < len; i++) {

            if (defineConfig.paths[pkg[i]]) {
                path = defineConfig.paths[pkg[i]];
            } else {
                path = pkg[i];
            }
            // 如果是 file:// 或 http:// 则直接加载
            if (!/^\.|^\/|^\w+\:\/\//.test(path)) {
                path = defineConfig.baseUrl + path + '.js';
            }
            loader(path);
        }
    };
    // 全局define
    function global_define(id, deps, cb) {
        defineList[id] = cb || deps;

        // if (id == defineConfig.mainId) {
        // 	setTimeout(function() {
        // 		global_require([id]);
        // 	});
        // }

    }

    function isdefined(id) {
        return !!defineList[id];
    }

    function require_config(config) {
        var key;
        if (config) {
            if (config.baseUrl) {
                defineConfig.baseUrl = config.baseUrl;
            }
            // if (config.mainId) {
            // 	defineConfig.mainId = config.mainId;
            // }
            if (config.paths) {
                for (key in config.paths) {
                    defineConfig.paths[key] = config.paths[key];
                }
            }
            'debug' in config && (defineConfig.debug = config.debug);
        }
    }

    // 全局require
    function global_require(pkg, cb, errorcb) {
        var i, len;
        var miss_pkg = [];
        var cb_pkg = [];
        // 判断缺失依赖
        for (i = 0, len = pkg.length; i < len; i++) {
            if (!defineList[pkg[i]]) {
                miss_pkg.push(pkg[i]);
            }
        }

        // 加载缺失依赖
        if (miss_pkg.length > 0) {
            global_loader(miss_pkg, call_cb, errorcb);
        } else {
            call_cb();
        }

        function call_cb() {
            var runer_result = pkg_runer(pkg);
            cb && cb.apply(this, runer_result);
        }

    }

    //TODO: 待比对AMD规范
    global_define.amd = true;
    global_require.config = require_config;
    global_require.isdefined = isdefined;
    global.define = global_define;
    global.require = global_require;
})(this);
/* PATH: src/js/brick.js */
define("brick", function(require, exports, module) {
/**
 * 框架的入口文件
 */

require('tpl/card/cards');
require('tpl/mod/mods');
var log = require('sdk/log');
var notice = require('sdk/notice');
var asyncQueue = require('sdk/asyncQueue');
var renderHTML = require('sdk/renderHTML');
var runlogic = require('sdk/runlogic');
var tplutil = require('sdk/tplutil');
var actController = require('act/controller');

asyncQueue.setDelay(0);

exports.notice = notice;

exports.render = renderHTML.render;

exports.replaceRender = renderHTML.replaceRender;

exports.onallRenderReady = renderHTML.onallRenderReady;

exports.initLogic = runlogic.init;

exports.onallLogicReady = runlogic.onallLogicReady;

exports.initAct = actController.init;

exports.tplutil = tplutil;

/**
 * debug
 * @param {Object} debug
 */
exports.setDebug = function(debug) {
	
	log.debug = debug;
	
};

log.debug = 1;




});

/* PATH: src/js/tpl/card/cards.js */
define("tpl/card/cards", function(require, exports, module) {
///contains('tpl/card/.+');
});

/* PATH: src/js/tpl/mod/mods.js */
define("tpl/mod/mods", function(require, exports, module) {
///contains('tpl/mod/.+');
});

/* PATH: src/js/sdk/log.js */
define("sdk/log", function(require, exports, module) {


var console = window.console;

exports = module.exports = function() {
	if (exports.debug) {
		console && console.log.apply(console, arguments);
	}
};

});

/* PATH: src/js/sdk/notice.js */
define("sdk/notice", function(require, exports, module) {

var noticeData = {};

/*
 * 对缓存的检索
 * @method find
 */
function find( type ) {
	return noticeData[ type ] || ( noticeData[ type ] = [] );
};

/*
 * 对是否有绑定的检察
 * @method has
 * @param {string} type
 */
exports.has = function( type ) {
	var fnList = find( type );
	return !!(fnList && fnList.length);
};

/*
 * 添加事件
 * @method on
 * @param {string} type
 * @param {Function} fn
 */
exports.on = function( type, fn ) {
	find( type ).unshift( fn );
};

/*
 * 移除事件
 * @method off
 * @param {string} type
 * @param {Function} fn
 */
exports.off = function( type, fn ) {
	var typeArray = find( type ),
		index,
		spliceLength;
	if ( fn ) {
		if ( ( index = indexOf( fn, typeArray ) ) > -1 ) {
			spliceLength = 1;
		}
	} else {
		index = 0;
		spliceLength = typeArray.length;
	}
	spliceLength && typeArray.splice( index, spliceLength );
};

/*
 * 事件触发
 * @method trigger
 * @param {string} type
 * @param {Array} args
 */
exports.trigger = function( type, args, next ) {
	var typeArray = find( type ), typeArrayLength = typeArray.length;
	args = [].concat( args || [], next ? next : [] );
	if (typeArrayLength) {
		for ( var i = typeArray.length - 1; i > -1; i-- ) {
			try {
				typeArray[ i ] && typeArray[ i ].apply( undefined, args );
			} catch ( e ) {
				throw e;
			}
		}
	} else {
		next && next();
	}
	
};

/*
 * 返回在数组中的索引
 * @method indexOf
 * @private
 * @param {Array} oElement 
 * @param {Any} oElement 
 *	需要查找的对象
 * @return {Number} 
 *	在数组中的索引,-1为未找到
 */
function indexOf( oElement, aSource ) {
	if ( aSource.indexOf ) {
		return aSource.indexOf( oElement );
	}
	for ( var i = 0, len = aSource.length; i < len; ++i ) {
		if ( aSource[ i ] === oElement ) {
			return i;
		}
	}
	return -1;
}
});

/* PATH: src/js/sdk/asyncQueue.js */
define("sdk/asyncQueue", function(require, exports, module) {
//异步队列

var loopArray = [];
var running = false;
var loopDelay = 1;

var enterFrame = ( function() {
	var requestAnimationFrame = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame;
	var enterFrame = function( fn ) {return setTimeout( fn, 2 )};
	
	//测试requestAnimationFrame的有效性
	requestAnimationFrame && requestAnimationFrame( function() {
		enterFrame = requestAnimationFrame;
	} );
	
	return function( fn ) {
		return enterFrame( function() {
			fn();
		} );
	}
} )();

/**
 * 异步队列
 * @param {Function} body
 *  @config {Function} next
 *  @config {Array} args
 * @param {Array} args
 */
exports = module.exports = function(body, args, delay) {
	
	if (delay === null) {
		body.apply(undefined, [emptyNext].concat(args));
	} else {
		loopArray.push([body, args, delay || loopDelay]);
		running || next();
	}
	
};

/**
 * 设置循环间隔
 * @param {number} delay
 */
exports.setDelay = function(delay) {
	loopDelay = delay;
};

///**
// * 是否在运行中
// */
//exports.isRunning = function() {
//	return running;
//};

function next() {
	
	var loopInfo = loopArray.shift();
	
	if (loopInfo) {
		running = true;
//		enterFrame(dobody);
		setTimeout(dobody, loopDelay);
	} else {
		running = false;
	}
	
	function dobody() {
    	loopInfo[0].apply(undefined, [next].concat(loopInfo[1]));
    }
}

function emptyNext(){}


});

/* PATH: src/js/sdk/renderHTML.js */
define("sdk/renderHTML", function(require, exports, module) {

var asyncQueue = require('./asyncQueue');
var notice = require('./notice');
var jsonpData = require('./jsonpData');
var uniqueId = require('./uniqueId');
var runlogic = require('./runlogic');
var cacheData = require('./cacheData');

/**
 * H5组件的渲染、逻辑的初始化、组件对象生命周期的管理器
 * @id sdk 
 * @author wangzheng4@Finrila
 */
var undefined = void 0;
var builderBoxDiv;
var renderingNum = 0;
var notice_allRenderReady = '--render--all-ready';
var notice_oneHtmlReady = '--render--one-html';
var renderDataArray_argsList = [];

/**
 * 组件的渲染方法
 * @method render 
 * @static
 * @param {Element} box
 * @param {Object} dataArray
 * @param {string} mode 默认 append, append/replace
 */
exports.render = function(box, dataArray, mode) {
	
	renderDataArray(box, dataArray);
	
};

exports.replaceRender = function(box, dataArray) {
	
	var hasIdDoms = box.querySelectorAll('[id]');
	for(var i = 0, l = hasIdDoms.length; i < l; ++i) {
		var id = hasIdDoms[i].id;
		runlogic.destroy(id);
		cacheData.removeData(id)
	}
	box.innerHTML = '';
	renderDataArray(box, dataArray);
	
};

/**
 * 绑定渲染完成事件
 * @param {Function} fn
 * @config {Object} renderedData
 */
exports.onallRenderReady = function(fn) {
	notice.on(notice_allRenderReady, fn);
	if (!renderingNum) {
		fn(cacheData.getAllData());
	}
};

/**
 * 绑定渲染完成事件
 * @param {Function} fn
 * @config {string} html
 */
exports.ononeHtmlReady = function(fn) {
	notice.on(notice_oneHtmlReady, fn);
};

/**
 * 渲染完成的检测
 */
function renderReadyCheck() {
	if (--renderingNum > 0) {
		return;
	}
	//处理事件 渲染完成
	notice.trigger(notice_allRenderReady, cacheData.getAllData());
}


/**
 * 渲染数据数组
 */
function renderDataArray(box, dataArray) {
	
	var dataArrayLength = dataArray.length;
	renderingNum += dataArrayLength;
	
	for (var i = 0; i < dataArrayLength; ++i) {
		asyncQueue(function(next, box, data) {
			
			if (data.async_api) {
				
				var replaceBox = builderBox('<div></div>');
				box.appendChild(replaceBox);
				
				//异步数据
				jsonpData(data.async_api, function(data) {
					if (data) {
						renderOne(box, replaceBox, data, renderReadyCheck);
					} else {
						renderReadyCheck();
					}
					//未处理错误情况
				});
				next();
			} else {
				//已知数据的进行渲染
				renderOne(box, null, data, function() {
					renderReadyCheck();
					next();
				});
			}
			
		}, [box, dataArray[i]], null);
		
	}
	
}

/**
 * 渲染单个card（完整的数据）
 */
function renderOne(box, replaceBox, data, ready) {
	
	var type = data.card_type || data.mod_type || data.type;
	
	if (type) {
		var logicid = data.card_type ? 'card/card' + type : type;
		var tplid = 'tpl/' + logicid;
		
		var renderData = {
			type: type,
			tplid: tplid,
			logicid: logicid,
			boxId: uniqueId('boxId'),
			box: undefined,
			data: data
		};
		
		var tplHandle = require(tplid);
		var html = tplHandle(data);
		var itemBox = renderData.box = builderBox(html);
		notice.trigger(notice_oneHtmlReady, html);
		var groupBox = itemBox.querySelector('[data-node=cardList]');
		
		itemBox.id = renderData.boxId;
		
		if (replaceBox) {
			box.replaceChild(itemBox, replaceBox);
		}
		else {
			box.appendChild(itemBox);
		}
		
		cacheData.setData(renderData.boxId, renderData);
		
		if (groupBox && data.card_group) {
			renderDataArray(groupBox, data.card_group);
		}
	}
	
	ready && ready();
	
}


/**
 * 构建节点
 */
function builderBox(html) {
	if (!builderBoxDiv) {
		builderBoxDiv = document.createElement('div');
		builderBoxDiv.style.display = 'none';
	}
	builderBoxDiv.innerHTML = html;
	return firstChild( builderBoxDiv );
}

function firstChild(el) {
	var firstChild = el.firstChild;
	while( firstChild.nodeType != 1 ) {
		firstChild = firstChild.nextSibling;
	}
	return firstChild;
}

});

/* PATH: src/js/sdk/jsonpData.js */
define("sdk/jsonpData", function(require, exports, module) {
/**
 * jsonp的方式获取数据
 */

var uniqueId = require('./uniqueId');

//var loadingNum = 0;

exports = module.exports = function(url, callback) {
	var callbackName = uniqueId();
	var ready = false;
//	++loadingNum;
	window[callbackName] = function(data) {
		if (!ready) {
			callback(data);
//			--loadingNum;
			ready = true;
		}
	};
	
	if (!/^(\/|http:\/\/)/.test(url)) {
		url = location.pathname.replace(/[^\/]*$/, '') + url;
		
	}
	
	url += (url.indexOf('?') == -1 ? '?' : '&') + 'callback=' + callbackName;
	
	require([url], null, function() {
		if (!ready) {
			callback(false);
//			--loadingNum;
			ready = true;
		}
	});
};

///**
// * 是否在加载中
// */
//exports.isLoading = function() {
//	return !!loadingNum;
//};

});

/* PATH: src/js/sdk/uniqueId.js */
define("sdk/uniqueId", function(require, exports, module) {

var uidNumber = 1;
var uidDateString = '_' + (+new Date) + '_';

module.exports = function(prefix) {
	return (prefix || '') + uidDateString + (uidNumber++);
};

});

/* PATH: src/js/sdk/runlogic.js */
define("sdk/runlogic", function(require, exports, module) {
/**
 * 运行逻辑
 */

var log = require('./log');
var notice = require('./notice');
var uniqueId = require('./uniqueId');
var asyncQueue = require('./asyncQueue');
var cacheData = require('./cacheData');

var notice_allLogicReady = '--logic--all-ready';
var logicStartingNum = 0;

exports.init = function(commonData) {

    var renderedData = cacheData.getAllData();

    for (var key in renderedData) {
        ++logicStartingNum;
        if ('logicObj' in renderedData[key]) {
            logicReadyCheck();
        } else {
            renderedData[key].logicObj = 1;
            asyncQueue(function(next, renderData) {
                var logicid = renderData.logicid;
                if (require.isdefined(logicid)) {
                    try {
                        renderData.logicObj = require(logicid)(renderData.box, renderData.data, commonData);
                    } catch (e) {
                        log('logic error: ' + logicid, e.message);
                    }
                } else {
                    log('logic is not defined: ' + logicid);
                }

                logicReadyCheck();
                next();
            }, [renderedData[key]]);
        }
    }

};

exports.destroy = function(id) {
    var data = cacheData.getData(id);
    if (data) {
        data.logicObj && data.logicObj && data.logicObj.destroy && data.logicObj.destroy();
    }
};


/**
 * 绑定逻辑完成事件
 * @param {Function} fn
 */
exports.onallLogicReady = function(fn) {
    notice.on(notice_allLogicReady, fn);
};


/**
 * 逻辑完成的检测
 */
function logicReadyCheck() {
    if (--logicStartingNum > 0) {
        return;
    }
    //处理事件 逻辑完成
    notice.trigger(notice_allLogicReady);
}
});

/* PATH: src/js/sdk/cacheData.js */
define("sdk/cacheData", function(require, exports, module) {
var cData = {};

exports.setData = function(id, data) {
	cData[id] = data;
};

exports.getData = function(id) {
	return cData[id];
};

exports.getAllData = function() {
	return cData;
};

exports.removeData = function(id) {
	cData[id] && delete cData[id];
};

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

/* PATH: src/js/act/controller.js */
define("act/controller", function(require, exports, module) {
/**
 * 公共逻辑的控制器
 * 
 * 支持的事件类型 此处还不支持 目前只支持原生事件 touchstart touchend tap longtap(它们会去兼容mouse相关事件)
 */
var log = require('sdk/log');
var notice = require('sdk/notice');
var renderHTML = require('sdk/renderHTML');

var dataActType = 'data-act-type';
var prefix = '--act-manager--';
var Document_bind_Events = {};

var actTypeMap = {};//act-type -> {eventList}

//对渲染html的监听
renderHTML.ononeHtmlReady(function(html) {
	
	html.replace(/ data-act-type="([^"]+)"/g, function(_, types) {
		types = types.split(' ');
		for (var i = 0, l = types.length; i < l; ++i) {
			actTypeMap[types[i]] = actTypeMap[types[i]] || {};
		}
	});
	
});
///



/**
 * 逻辑初始化 （act分析、事件的绑定）
 */
exports.init = function() {
	
	for (var actType in actTypeMap) {
		(function(actType) {
			
			actTypeMap[actType].events || require(['act/' + actType], function(actHandler) {
				if (!actHandler) {
					log('act/' + actType + ' is undefined!');
					return;
				}
				
				var handlerEvents = actHandler.events;
				var events = actTypeMap[actType].events = {};
				
				for(var eventType in handlerEvents) {
					var types = eventType.split(' ');
					for(var i = 0, l = types.length; i < l; ++i) {
						bindEvent(actType, types[i], events[types[i]] = handlerEvents[eventType]);
					}
				}
			});
			
		})(actType);
	}
	
};
/**
 * 绑定通知和dom事件
 */
function bindEvent(actType, eventType, fn) {
	
	notice.on( prefix + actType + eventType, fn);
	bindDocument(eventType);
	
}

/**
 * 全局绑定
 * @param {Object} type
 */
function bindDocument(type) {
	
	if (!Document_bind_Events[type]) {
		$(document).on(type, handler);
		Document_bind_Events[type] = 1;
	}
	
}

/**
 * 统一的事件处理方法
 */
function handler(e) {

	var active = e.target, act_types;
	do {
		if (act_types = active.getAttribute && active.getAttribute(dataActType)) {
			
			act_types.split(' ').forEach(function(item) {
				notice.trigger( prefix + item + e.type, [e, active, queryToJson( active.getAttribute('data-act-data') || '' )] );
			});
			
			break;
		}
	} while(active = active.parentNode);

}


/*
 * query to json
 * @method core_queryToJson
 * @private
 * @param {string} query
 * @return {json} JSON
 * @example
 * var q1 = 'a=1&b=2&c=3';
 * core_queryToJson( q1 ) === {'a':1,'b':2,'c':3};
 */
function queryToJson( query ) {
	var queryList = query.split( '&' );
	var retJson  = {};
	for( var i = 0, len = queryList.length; i < len; ++i ) {
		if ( queryList[ i ] ) {
			var hsh = queryList[ i ].split( '=' );
			var key = hsh[ 0 ];
			var value = hsh[ 1 ] || '';
			retJson[ key ] = retJson[ key ] ? [].concat( retJson[ key ], value ) : value;
		}
	}
	return retJson;
}
});

define("tpl/card/card10", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card10 line-around" data-act-type="hover">    <div class="layout-box media-graphic">        <div class="mod-media size-m">            <div class="media-main">                <img src="'+(data.user.profile_image_url)+'" data-node="cImgUsr" height="64" width="64"/>                ');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.user);})());aRet.push('            </div>        </div>        <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut');if(!data.desc1){}aRet.push('">'+(data.user.screen_name)+'</div>            <div class="item-minor txt-s mct-d txt-cut');if(!data.desc2){}aRet.push('">'+(data.desc1)+'</div>            ');if(data.desc2){aRet.push('                <div class="item-other txt-s mct-d txt-cut">'+(data.desc2)+'</div>            ');}aRet.push('        </div>        ');if(data.buttons||(data.user&&data.user.buttons)){aRet.push('        ');if((data.buttons||(data.user&&data.user.buttons)) && (data.buttons||(data.user&&data.user.buttons)).constructor === Array){with({i:0,l:(data.buttons||(data.user&&data.user.buttons)).length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=(data.buttons||(data.user&&data.user.buttons))[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('        ');}}}aRet.push('        ');}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/common/verified", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (user) {
var aRet = [];if (!user|| typeof user!= "object" ) return "";if(user.verified === true && ('verified_type' in user) && user.verified_type == 0){aRet.push('<i class="icon icon-yellowv" data-node="cIconUsr"></i>');}else if(user.verified === true && ('verified_type' in user) && user.verified_type > 0 && user.verified_type < 8){aRet.push('<i class="icon icon-bluev" data-node="cIconUsr"></i>');}else if(user.verified === false && ('verified_type' in user) && user.verified_type == 220){aRet.push('<i class="icon icon-club" data-node="cIconUsr"></i>');}else if(user.verified === false && user.level && user.level == 10){aRet.push('<i class="icon icon-vgirl" data-node="cIconUsr"></i>');}else if(user.verified === false && user.level && user.level === 2){aRet.push('<i class="icon icon-vip" data-node="cIconUsr"></i>');}return aRet.join("");
}
});
define("tpl/common/button", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (btn) {
var aRet = [];if (!btn|| typeof btn!= "object" ) return "";aRet.push('<a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(btn);})());aRet.push('  ');if( btn.type && (btn.type === "like" || btn.type === "follow")){aRet.push('   data-act-type="hover '+(btn.type)+'" data-act-data="sub_type='+(btn.sub_type)+'"  ');}aRet.push('  ');if(btn.type === "default" && btn.params && btn.params.action){aRet.push('   data-act-type="hover btn_default" data-act-data="action='+(btn.params.action)+'"  ');}aRet.push('><div class="mod-operate">    <div class="operate-inner line-left">    <div class="inner">        ');if( btn.type && btn.type === "like"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon icon-liked"></i>            ');}else{aRet.push('            <i class="icon icon-like"></i>            ');}aRet.push('        ');}else if( btn.type && btn.type === "follow"){aRet.push('            ');if(btn.sub_type && btn.sub_type === 1){aRet.push('            <i class="icon-font icon-font-followed"></i>            <div data-node="cImgTxt" class="txt-xxs" style="color:#AAA">已关注</div>            ');}else{aRet.push('            <i class="icon-font icon-font-follow"></i>            <div data-node="cImgTxt" class="txt-xxs">加关注</div>            ');}aRet.push('        ');}else{aRet.push('            ');if(btn.pic){aRet.push('            <img data-node="cImgPic" src="'+(btn.pic)+'" height="24" width="24"/>            ');}aRet.push('            <div data-node="cImgTxt" class="txt-xxs" >'+(btn.name)+'</div>        ');}aRet.push('        </div>    </div></div></a>');return aRet.join("");
}
});
define("tpl/common/openTarget", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push(' href="'+((data.urls && data.urls.h5) || data.scheme || data.openurl || 'javascript:;')+'" ');return aRet.join("");
}
});
define("tpl/card/card11", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title G-1or2 组合类型一 (card11)@category Group - 组合类型@readme G-1or2 组合类型一 ---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card11');if(data.show_type != 1){aRet.push(' card-combine');}aRet.push('" data-node="group">    ');if(data.title){aRet.push('    <h3 class="title mct-b txt-xs" data-node="gTitle">'+(tplFunc.trim(data.title))+'</h3>    ');}aRet.push('    <div data-node="cardList" class="card-list">    </div>    ');if(data.buttontitle){aRet.push('    <footer class="more-detail line-around">        <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover" class="mct-d txt-s">'+(data.buttontitle)+'');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        </a>    </footer>    ');}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/common/arrowRight", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";if(data.display_arrow && data.display_arrow === 1){aRet.push('<span data-node="arrow" class="plus plus-s"><i class="icon-font icon-font-arrow-right txt-s"></i></span>');}return aRet.join("");
}
});
define("tpl/card/card13", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title W-1 嵌入网页内容 (card13)@category Webview - 网页类@readme 嵌入网页内容---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card13 line-around">    <article class="web-article">        <header class="title-box">            <h3 class="title mct-a">'+(data.title)+'</h3>            <div class="subtitle mct-d txt-xs"><em class="time">2014-02-17 14:20</em><em class="from">新浪微博</em></div>        </header>        <iframe src="'+(data.content_url)+'" class="main-content" frameborder="0" scrolling="no"></iframe>    </article></div>');return aRet.join("");
}
});
define("tpl/card/card15", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title O-1 热门微博 (card15)@category Other - 其他类@readme 热门微博---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card15 line-around">    <a class="layout-box media-graphic" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">         <div class="mod-media size-m">            <div class="media-main"><img src="'+(data.user.profile_image_url)+'" height="64" width="64"></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut">'+(data.title_sub)+'</div>            <div class="item-minor txt-s mct-d">'+(data.desc1)+'</div>        </div>    </a></div>');return aRet.join("");
}
});
define("tpl/card/card16", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-4 双列分离式 (card16)@category Link - 链接类@readme 双列分离式---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card16 line-around">    <div class="layout-box">    ');if(data.group && data.group.constructor === Array){with({i:0,l:data.group.length,group_index:0,group:null}){for(i=l;i--;){group_index=(l-i-1);group=data.group[group_index];aRet.push('        <a class="box-col" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(group);})());aRet.push(' data-act-type="hover">            <i class="iconimg iconimg-m"><img width="36" height="36" src="'+(group.pic)+'" alt=""></i><i class="mct-a">'+(group.title_sub)+'</i>        </a>');}}}aRet.push('              </div></div>');return aRet.join("");
}
});
define("tpl/card/card17", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-2 双列式（可扩展）(card17)@category Link - 链接类@readme 双列式（可扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card17 line-around col-'+(data.col)+'">');if(data.group && data.group.constructor === Array){with({i:0,l:data.group.length,group_index:0,group:null}){for(i=l;i--;){group_index=(l-i-1);group=data.group[group_index];aRet.push('<a class="item-box line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(group);})());aRet.push('>        <div class="layout-box">            <div class="mct-a box-col txt-m txt-cut">'+(group.title_sub)+'</div>');if(group.corner_mark){aRet.push('            <div><span class="bubble bubble-blue txt-xxs">'+(group.corner_mark)+'</span></div>');}aRet.push('        </div>    </a>');}}}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card19", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-6 四列式 (card19)@category Link - 链接类@readme 四列式---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card19 line-around col-'+(data.col)+'">');if(data.group && data.group.constructor === Array){with({i:0,l:data.group.length,group_index:0,group:null}){for(i=l;i--;){group_index=(l-i-1);group=data.group[group_index];aRet.push('<a class="item-box line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(group);})());aRet.push('>          <div class="content-main">             <i class="iconimg iconimg-m"><img width="36" height="36" src="'+(group.pic)+'" alt="" data-node="cImgPic"></i>             <div class="mct-a txt-xs txt-cut" data-node="cImgTxt">'+(group.title_sub)+'</div>          </div>      </a>');}}}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card2", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title S-3 Applist (card2)@category Special - 特殊类型@readme 双列式（可扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card2 line-around">    <div class="layout-box">        ');if(data.apps && data.apps.constructor === Array){with({i:0,l:data.apps.length,app_index:0,app:null}){for(i=l;i--;){app_index=(l-i-1);app=data.apps[app_index];aRet.push('            <a class="box-col line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(app);})());aRet.push(' data-act-type="hover">                ');if(app.count){aRet.push('                <div class="mct-a txt-s">'+(app.count)+'</div>                ');}aRet.push('                <div class="mct-a txt-s txt-bottom">'+(app.title)+'</div>            </a>            ');if(data.apps.length > 5){aRet.push('                ');if(app_index == 3){aRet.push('                    <a href="javascript:;" data-act-type="hover" node-type="more" class="box-col line-separate">                        <div class="mct-s txt-s"><i class="icon-font icon-font-arrow-down txt-m"></i></div>                        <div class="mct-a txt-s txt-bottom">更多</div>                    </a>                    <div node-type="pop-list" style="display:none;">                        <div class="layout-box">                ');}aRet.push('                ');if(app_index >= 3){aRet.push('                    ');if(app_index == data.apps.length - 1){aRet.push('                        </div></div>                    ');}else if(app_index != 3 && (app_index - 3) % 4 === 0){aRet.push('                        </div><div class="layout-box" data-index="'+(app_index)+'">                    ');}aRet.push('                ');}aRet.push('            ');}aRet.push('        ');}}}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card20", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-3 双列式（居中不可扩展）(card20)@category Link - 链接类@readme 双列式（居中不可扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card20 line-around">');if(data.group && data.group.constructor === Array){with({i:0,l:data.group.length,group_index:0,group:null}){for(i=l;i--;){group_index=(l-i-1);group=data.group[group_index];aRet.push('    <a class="item-box line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(group);})());aRet.push(' data-act-type="hover">        ');if(group.pic){aRet.push('        <i class="iconimg iconimg-xs"><img width="18" height="18" src="'+(group.pic)+'" alt=""></i>        ');}aRet.push('        <span class="mct-a txt-m">'+(group.title_sub)+'</span>    </a>');}}}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card21", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title U-1 单行4头像 (card21)@category User - 用户头像类@readme ---单行4头像------说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push(' <div class="card card21 line-around" data-jump="'+(data.scheme || data.openurl || '')+'">    ');if(data.title){aRet.push('        <h4 class="title mct-a txt-xs">'+(data.title)+'</h4>    ');}aRet.push('    <div class="layout-box">        <div class="box-col layout-box">            ');if(data.users && data.users.constructor === Array){with({i:0,l:data.users.length,user_index:0,user:null}){for(i=l;i--;){user_index=(l-i-1);user=data.users[user_index];aRet.push('            <div class="mod-media size-m">                <div class="media-main"><img data-node="cImgUsr" src="'+(user.profile_image_url)+'" height="64" width="64">                    ');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(user);})());aRet.push('                </div>                ');if(user.screen_name){aRet.push('                <div class="media-txt txt-s txt-cut" data-node="cNameUsr">'+(user.screen_name)+'</div>                ');}aRet.push('            </div>            ');}}}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card22", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-2 单张大图 (card22)@category Picture - 图片类@readme 单张大图（带圆角）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card22 line-around">   <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">   <div class="card-inner">        <img data-node="cImgAdv" src="'+(data.pic)+'">        ');if(data.content1){aRet.push('            <div class="card-title">'+(data.content1)+'</div>        ');}aRet.push('    </div>   </a></div>');return aRet.join("");
}
});
define("tpl/card/card23", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-5 三列式 (card23)@category Link - 链接类@readme 三列式---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card23 line-around">    <a class="layout-box" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">    ');if(data.apps && data.apps.constructor === Array){with({i:0,l:data.apps.length,app_index:0,app:null}){for(i=l;i--;){app_index=(l-i-1);app=data.apps[app_index];aRet.push('        <div class="box-col line-separate">        ');if(app.count){aRet.push('            <div class="mct-a txt-m">'+(app.count)+'</div>');}aRet.push('            <div class="mct-c txt-xs">'+(app.title)+'</div>        </div>');}}}aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
}
});
define("tpl/card/card24", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title U-2 单行7头像 (card24)@category User - 用户头像类@readme 单行7头像---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card24 line-around">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col layout-box">        ');if(data.users && data.users.constructor === Array){with({i:0,l:data.users.length,user_index:0,user:null}){for(i=l;i--;){user_index=(l-i-1);user=data.users[user_index];aRet.push('            <div class="mod-media size-xs">                <div class="media-main"><img src="'+(user.profile_image_url)+'" height="34" width="34" />');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(user);})());aRet.push('</div>            </div>            ');}}}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
}
});
define("tpl/card/card25", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-5 图像文字混排两行两字段 (card25)@category Picture + Text - 图片文字混排类@readme 图像文字混排两行两字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card25 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    <div class="layout-box media-graphic">        ');if(data.score || data.pic){aRet.push('            <div class="mod-media size-s">                <div class="media-main">                    ');if(data.score){aRet.push('                        <span class="score-box">'+(data.score)+'</span>                    ');}else if(data.pic){aRet.push('                        <img src="'+(data.pic)+'" height="50" width="50" data-node="cImg">                    ');}aRet.push('                </div>            </div>        ');}aRet.push('        <div class="box-col item-list">            ');if(data.title_sub){aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">'+(data.title_sub)+'</div>            ');}aRet.push('            ');if(data.desc){aRet.push('            <div class="item-minor txt-s mct-d txt-cut">'+(data.desc)+'</div>            ');}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('             ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('         ');}}}aRet.push('         ');}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card26", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-1 图像文字混排三行两字段 (card26)@category Picture + Text - 图片文字混排类@readme 图像文字混排三行两字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push(' <div class="card card26 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    <div class="layout-box media-graphic">        ');if(data.pic){aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="'+(data.pic)+'" height="64" width="64"></div>         </div>         ');}aRet.push('         ');if(data.title_sub && data.desc){aRet.push('               <div class="box-col item-list">            ');if(data.title_sub){aRet.push('            <div class="item-main txt-m mct-a" data-node="cTitle">'+(data.title_sub)+'</div>            ');}aRet.push('            ');if(data.desc){aRet.push('            <div class="item-minor txt-s mct-d" data-node="cDesc">'+(data.desc)+'</div>            ');}aRet.push('        </div>        ');}aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('         ');}}}aRet.push('         ');}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card27", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-6 大图推广 (card27)@category Picture + Text - 图片文字混排类@readme 大图推广 ---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card27 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    ');if(data.title_sub || data.pic || data.desc){aRet.push('    <div class="main-content">        ');if(data.title_sub){aRet.push('        <h4 class="title mct-b txt-l" data-node="cTitle">'+(data.title_sub)+'</h4>        ');}aRet.push('        ');if(data.pic){aRet.push('        <div class="media-pic">            <img src="'+(data.pic)+'" data-node="cImg" alt="">        </div>         ');}aRet.push('         ');if(data.desc){aRet.push('        <div class="media-txt txt-xs" data-node="cDesc">            '+(data.desc)+'        </div>        ');}aRet.push('    </div>    ');}aRet.push('    ');if(data.buttons && data.buttons.length){aRet.push('    <footer class="more-detail line-top ');if(data.buttons.length>1){aRet.push('layout-box');}aRet.push('">        ');if(data.buttons.length >1){aRet.push('            ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            <a data-active="1" href="'+((btn.params && btn.params.scheme)?btn.params.scheme:(btn.params && btn.params.openurl)?btn.params.openurl:'javascript:void(0);')+'" class="box-col ');if((btn_index + 1) !== data.buttons.length){aRet.push('line-right');}aRet.push(' txt-s" data-node="cImgTxtLink" ');if(btn.type){aRet.push('data-type="'+(btn.type)+'"');}aRet.push('>                ');if( btn.type && btn.type === "like"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-liked"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-like"></i>                    ');}aRet.push('                ');}else if( btn.type && btn.type === "forward"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-forwarded"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-forward"></i>                    ');}aRet.push('                ');}else if( btn.type && btn.type === "dots"){aRet.push('                    ');if(btn.sub_type && btn.sub_type === 1){aRet.push('                    <i class="icon-font icon-font-dotsed"></i>                    ');}else{aRet.push('                    <i class="icon-font icon-font-dots"></i>                    ');}aRet.push('                ');}else{aRet.push('                    <i class="iconimg iconimg-xs">                        <img data-node="cImgPic" src="'+(btn.pic)+'" alt="" />                    </i>                ');}aRet.push('                ');if(btn.name){aRet.push('                <em class="num mct-d">'+(btn.name)+'</em>                ');}aRet.push('            </a>            ');}}}aRet.push('        ');}else{aRet.push('            ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            <a data-active="1" data-node="cImgTxtLink" href="'+((btn.params && btn.params.scheme)?btn.params.scheme:(btn.params && btn.params.openurl)?btn.params.openurl:'javascript:void(0);')+'" class="mct-d txt-m">'+(btn.name)+'            ');if(data.display_arrow && data.display_arrow === 1){aRet.push('            <i class="icon-font icon-font-arrow-down"></i>            ');}aRet.push('            </a>            ');}}}aRet.push('        ');}aRet.push('    </footer>    ');}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card28", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-2 头像文字混排三行两字段 (card28)@category User + Text - 头像文字混排类@readme 头像文字混排三行两字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card28 line-around">    <div class="layout-box media-graphic">         <div class="mod-media size-m">            <div class="media-main"><img src="'+(data.user.profile_image_url)+'" height="64" width="64"></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut">'+(data.user.screen_name)+'<a href="" class="btn btn-vip">');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.user);})());aRet.push('<i class="icon-font icon-font-arrow-right"></i></a></div>            <div class="item-minor txt-s mct-d">简介：'+(data.user.description)+'</div>        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());if(data.buttons){if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('        ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('        ');}}}}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card29", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-3 单张大图 (card29)@category Picture - 图片类@readme 单张大图（带边距）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card29 line-around" data-node="card"><a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">');if(data.title_sub){aRet.push('    <h4 class="title txt-s" data-node="cTitle">'+(data.title_sub)+'</h4>    ');}aRet.push('    <div class="media-pic">         <img data-node="cImgPic" src="'+(data.pic)+'" style="width:100%;height:82px;" alt="">    </div>    </a></div>');return aRet.join("");
}
});
define("tpl/card/card3", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-1 单行4张（单触区）(card3)@category Picture - 图片类@readme 单行4张（单触区）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card3 line-around">    ');if(data.title){aRet.push('        <h4 class="title mct-a txt-xs">'+(data.title)+'</h4>    ');}aRet.push('    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col layout-box">            ');if(data.pics && data.pics.constructor === Array){with({i:0,l:data.pics.length,item_index:0,item:null}){for(i=l;i--;){item_index=(l-i-1);item=data.pics[item_index];aRet.push('                ');if(item_index < 4){aRet.push('                    <div class="mod-media size-m">                        <div class="media-main">                            <img src="'+(item.pic)+'" height="64" width="64">                        </div>                        ');if(item.desc1){aRet.push('                            <div class="media-txt txt-s mct-a txt-cut">'+(item.desc1)+'</div>                        ');}aRet.push('                    </div>                ');}aRet.push('            ');}}}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
}
});
define("tpl/card/card30", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-3 头像文字混排两行两字段 (card30)@category User + Text - 头像文字混排类@readme 头像文字混排两行两字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card30 line-around" data-node="card" data-jump="'+(data.scheme || data.openurl || '')+'" data-act-type="hover">    <div class="layout-box media-graphic">         <div class="mod-media size-m">            <div class="media-main">                <img src="'+(data.user.profile_image_url)+'" data-node="cImgUsr" height="64" width="64"/>                    ');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.user);})());aRet.push('            </div>        </div>          <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut" data-node="cNameUsr">'+(data.user.screen_name)+'                ');if(data.user.mbtype && (data.user.mbtype === 11 || data.user.mbtype === 12 || data.user.mbtype === 13 || data.user.mbtype === 14)){aRet.push('                <a data-node="cIconLink" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data.user);})());aRet.push(' data-act-type="hover" class="btn btn-vip"><i class="icon icon-vip"></i>                ');}else{aRet.push('                <a data-node="cIconLink" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data.user);})());aRet.push(' data-act-type="hover" class="btn btn-nvip"><i class="icon icon-nvip"></i>                ');}aRet.push('                <i class="icon-font icon-font-arrow-right"></i>                </a>            </div>            ');if(data.desc1){aRet.push('            <div class="item-minor txt-s mct-d" data-node="cTxtUsr">'+(data.desc1)+'</div>            ');}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('         ');}}}aRet.push('         ');}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card31", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title S-4 搜索框 (card31)@category Special - 特殊类型@readme 搜索框---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card31 line-around">    <form method="" class="layout-box search-box">        <span class="icon-font icon-font-search"></span>        <input class="box-col search" type="search" placeholder="'+(data.desc)+'"/>    </form></div>');return aRet.join("");
}
});
define("tpl/card/card32", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title S-5 新粉丝提醒 (card32)@category Special - 特殊类型@readme 新粉丝提醒---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card32 line-around" data-node="card" data-act-type="hover" data-jump="'+(data.scheme || data.openurl || '')+'">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' class="layout-box" data-act-type="hover">        ');if(data.pic){aRet.push('        <i class="iconimg iconimg-s">            <img width="23" height="23" src="'+(data.pic)+'" data-node="cMesImg">        </i>        ');}aRet.push('        <div class="box-col txt-cut"><span class="mct-a " data-node="cMesTxt">'+(data.desc1)+'</span></div>        <span class="plus plus-m">            ');if(data.desc2){aRet.push('            <i class="bubble bubble-dot-red txt-xs" data-node="cMesNum">'+(data.desc2)+'</i>            ');}aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        </span>              </a></div>');return aRet.join("");
}
});
define("tpl/card/card33", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card33 line-around">    <div class="layout-box">        <div class="box-col layout-box">            ');if(data.pics && data.pics.constructor === Array){with({i:0,l:data.pics.length,item_index:0,item:null}){for(i=l;i--;){item_index=(l-i-1);item=data.pics[item_index];aRet.push('            <div class="mod-media size-m">                <div class="media-main">                    <img src="'+(item.pic)+'" height="64" width="64">                </div>            </div>');}}}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card35", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-4 单行3张（多触区，支持扩展） (card35)@category Picture - 图片类@readme 单行3张（多触区，支持扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card35 line-around">');if(data.pics && data.pics.constructor === Array){with({i:0,l:data.pics.length,pic_index:0,pic:null}){for(i=l;i--;){pic_index=(l-i-1);pic=data.pics[pic_index];aRet.push('    <a class="item-box mod-media" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(pic);})());aRet.push(' data-act-type="hover">        <div class="media-main">            <img src="'+(pic.pic_small)+'" />        </div>');if(pic.desc1){aRet.push('        <div class="media-txt txt-s txt-cut">           '+(pic.desc1)+'        </div>');}aRet.push('    </a>');}}}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card36", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card36 line-around">    <div class="layout-box media-graphic">         <div class="mod-media size-l">            <div class="media-main"><img src="'+(data.pic)+'" height="70" width="70"><!--<i class="icon icon-vgirl"></i>--></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a">'+(data.title_sub)+'</div>            <div class="item-minor"><em class="original mct-num txt-s">'+(data.desc1)+'</em><em class="resent-price mct-d txt-xs">'+(data.desc2)+'</em><em class="other-info mct-d txt-xs">'+(data.desc3)+'</em></div>        </div>        ');if(data.buttons){aRet.push('            ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('                ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('            ');}}}aRet.push('        ');}aRet.push('        <!--        <div class="mod-operate">            <div class="operate-inner">                <div class="inner">                    <span class="icon-font icon-font-cart"></span>                    <div class="txt-xxs">购买</div>                </div>            </div>        </div>        -->    </div></div>');return aRet.join("");
}
});
define("tpl/card/card38", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card line-around card38">    <div class="star-box">        ');if([1,2,3,4,5] && [1,2,3,4,5].constructor === Array){with({i:0,l:[1,2,3,4,5].length,r_index:0,r:null}){for(i=l;i--;){r_index=(l-i-1);r=[1,2,3,4,5][r_index];aRet.push('        <span class="icon-font icon-font-star');if(data.rating >= r){aRet.push(' star-choosed');}aRet.push('"></span>        ');}}}aRet.push('    </div>    <div class="star-info mct-d txt-s">'+(['','很差', '一般', '还行', '不错', '怒赞'][data.rating])+'</div>    <div class="more-detail line-top"><a href="'+(data.buttonscheme)+'" class="mct-d txt-m">'+(data.buttontitle)+'</a></div></div>');return aRet.join("");
}
});
define("tpl/card/card39", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title P-4 单行3张（多触区，支持扩展） (card39)@category Picture - 图片类@readme 单行3张（多触区，支持扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card39 line-around" data-act-type="hover"><a href="'+(data.video_infos.media_info.h5_url)+'">        <i class="icon icon-video"></i>        <img src="'+(data.video_infos.pic_url)+'" alt="">    </a></div>');return aRet.join("");
}
});
define("tpl/card/card4", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-1 单列式 (card4)@category Link - 链接类@readme 单列式---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<!--带图标--><div class="card card4 line-around">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' class="layout-box" data-act-type="hover">    ');if(data.pic){aRet.push('    <i class="iconimg iconimg-s"><img width="23" height="23" src="'+(data.pic)+'" alt=""></i>    ');}aRet.push('    <div class="box-col txt-cut">        <span class="mct-a ">'+(data.desc)+'</span>        ');if(data.desc_extr){aRet.push('        <span class="mct-b txt-xs">'+(data.desc_extr)+'</span>        ');}aRet.push('    </div>    ');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
}
});
define("tpl/card/card41", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card41 line-around">    <div class="layout-box">        ');if(data.item_name){aRet.push('        <div class="des-title txt-m mct-d">'+(data.item_name)+'</div>        ');}aRet.push('        <div class="box-col des-main txt-m">'+(data.item_content)+'</div>    </div> </div>');return aRet.join("");
}
});
define("tpl/card/card42", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card42 line-around" data-act-type="hover">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' class="layout-box" data-act-type="hover">        ');if(data.pic){aRet.push('            <i class="iconimg iconimg-s"><img width="23" height="23" src="'+(data.pic)+'" alt=""></i>        ');}aRet.push('        <div class="box-col txt-cut">            <span class="mct-a ">'+(data.desc)+'</span>            ');if(data.desc_extr){aRet.push('            <span class="mct-b txt-xs">'+(data.desc_extr)+'</span>            ');}aRet.push('        </div>        ');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
}
});
define("tpl/card/card6", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-7 按钮式 (card6)@category Link - 链接类@readme 按钮式（跳转）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card6 line-around">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">    <button data-node="cButton" class="btn btn-');if(data.show_type == 0 || !('show_type' in data)){aRet.push('default');}else if(data.show_type == 1){aRet.push('green');}else if(data.show_type == 2){aRet.push('red');}else if(data.show_type == 3){aRet.push('blue');}else if(data.show_type == 4){aRet.push('highwhite');}aRet.push('">    '+(data.desc)+'    ');if(data.show_type && data.show_type === 0){aRet.push('    <i class="icon-font icon-font-arrow-right"></i>    ');}aRet.push('</button></a></div>');return aRet.join("");
}
});
define("tpl/card/card7", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title T-1 四行以内纯文本 (card7)@category Text - 纯文本类@readme 四行以内纯文本（两个字段）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card7 line-around" data-node="card">    ');if(data.title){aRet.push('    <h4 class="title mct-d txt-xs" data-node="cTitle">'+(data.title)+'</h4>    ');}aRet.push('    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col content-text txt-l mct-a" data-node="cDesc">            '+(data.desc)+'        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a>     ');if(data.source && data.source ===1 ){aRet.push('    <div class="info-footer mct-d txt-xxs" data-node="cSource">'+(data.source)+'</div>    ');}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/card/card8", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title PT-2 图像文字混排三行三字段 (card8)@category Picture + Text - 图片文字混排类@readme 图像文字混排三行三字段---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card8 line-around" data-node="card" data-jump="'+(data.scheme?data.scheme:data.openurl?data.openurl:'')+'" data-act-type="hover">    ');if(data.title){aRet.push('        <h4 class="title mct-a txt-xs">'+(data.title)+'</h4>    ');}aRet.push('    <div class="layout-box media-graphic">        ');if(data.pic){aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="'+(data.pic)+'" height="64" width="64"></div>         </div>        ');}aRet.push('             <div class="box-col item-list">            ');if(data.title_sub){aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">'+(data.title_sub)+'</div>            ');}aRet.push('            ');if(data.desc1){aRet.push('            <div class="item-minor txt-s mct-d txt-cut" data-node="cDesc">'+(data.desc1)+'</div>            ');}aRet.push('            ');if(data.desc2){aRet.push('            <div class="item-other txt-s mct-d txt-cut" data-node="cDesc">'+(data.desc2)+'</div>            ');}aRet.push('        </div>');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        ');if(data.buttons){aRet.push('        ');if(data.buttons && data.buttons.constructor === Array){with({i:0,l:data.buttons.length,btn_index:0,btn:null}){for(i=l;i--;){btn_index=(l-i-1);btn=data.buttons[btn_index];aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/button");return tpl(btn);})());aRet.push('        ');}}}aRet.push('        ');}aRet.push('    </div></div>');return aRet.join("");
}
});
define("tpl/card/card9", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card9 line-around" data-act-type="hover">    ');if(data.mblog.deleted == 1){aRet.push('        <section class="weibo-detail" style="padding:10px">            <p class="default-content">'+(data.mblog.text)+'</p>        </section>    ');}else{aRet.push('        ');if(data.mblog.isTop || (data.mblog.visible && data.mblog.visible.type)){aRet.push('        <div class="line-around head-bar">            <h3 class="title mct-d txt-xs">');if(data.mblog.isTop){aRet.push('置顶');}else{aRet.push('              ');if(data.mblog.visible.type == 1){aRet.push('自己可见');}else if(data.mblog.visible.type == 3){aRet.push('分组可见');}else if(data.mblog.visible.type == 6){aRet.push('好友圈');}aRet.push('            ');}aRet.push('</h3>            <i class="icon-font icon-font-arrow-down txt-s"></i>        </div>        ');}aRet.push('        <header class="layout-box media-graphic">            <a href="'+(data.mblog.user.profile_url)+'" class="mod-media size-xs">                <div class="media-main"><img src="'+(data.mblog.user.profile_image_url)+'" height="34" width="34">');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(data.mblog.user);})());aRet.push(' </div>            </a>            <div class="box-col item-list">                <a href="'+(data.mblog.user.profile_url)+'" class="item-main txt-m mct-a txt-cut">'+(data.mblog.user.screen_name)+'</a>                <div class="item-minor txt-xxs mct-d txt-cut"><span class="time">'+(data.mblog.created_at)+'</span><span class="from">来自'+(data.mblog.source)+'</span></div>            </div>            ');if(!data.hideoperate && !data.hidebtns && !data.mblog.isTop && (!data.mblog.visible || !data.mblog.visible.type)){aRet.push('            <a class="operate-box" data-act-type="hover">                <i class="icon-font icon-font-arrow-down txt-s"></i>            </a>            ');}aRet.push('        </header>        <section class="weibo-detail">            <p class="default-content">'+(data.mblog.text)+'</p>            ');aRet.push((function(){var tpl = require("tpl/common/feedPic");return tpl(data.mblog);})());aRet.push('            ');if(data.mblog.retweeted_status){aRet.push('            <div class="extend-content" data-act-type="hover">                <div class="inner">                    <p class="weibo-original txt-m"><a href="'+(data.mblog.retweeted_status.user.profile_url)+'" class="">@'+(data.mblog.retweeted_status.user.screen_name)+'：</a>'+(data.mblog.retweeted_status.text)+'</p>                    ');aRet.push((function(){var tpl = require("tpl/common/feedPic");return tpl(data.mblog.retweeted_status);})());aRet.push('                </div>            </div>            ');}aRet.push('            <!--            ');if(!data.mblog.retweeted_status && data.mblog.page_info){aRet.push('              <div class="card card8 line-all obj-'+(data.mblog.page_info.object_type)+'">                  <div class="layout-box media-graphic">                      ');if(data.mblog.page_info.page_pic){aRet.push('                          ');if(data.mblog.page_info.media_info){aRet.push('                            <a class="mod-media size-m" href="'+(data.mblog.page_info.media_info.h5_url)+'">                                <div class="media-main">                                  <img src="'+(data.mblog.page_info.page_pic)+'" height="64" width="64">                                </div>                            </a>                          ');}else{aRet.push('                            <div class="mod-media size-m">                                <div class="media-main">                                  <img src="'+(data.mblog.page_info.page_pic)+'" height="64" width="64">                                </div>                            </div>                          ');}aRet.push('                      ');}aRet.push('                      <div class="box-col item-list">                          <div class="item-main txt-m mct-a txt-cut">'+(data.mblog.page_info.page_title)+'</div>                          <div class="item-minor txt-s mct-d txt-cut">'+(data.mblog.page_info.page_desc)+'</div>                          ');if(data.mblog.page_info.tips){aRet.push('                            <div class="item-other txt-s mct-d txt-cut">'+(data.mblog.page_info.tips)+'</div>                          ');}aRet.push('                      </div>                  </div>              </div>            ');}aRet.push('            -->        </section>        ');if(!data.hidebtns){aRet.push('        <footer class="more-detail line-top layout-box box-center-v">            ');if(data.mblog.visible.type == 0){aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="forward"><i class="icon-font icon-font-forward"></i><em class="num mct-d">');if(data.mblog.reposts_count){aRet.push(''+(data.mblog.reposts_count)+'');}else{aRet.push('转发');}aRet.push('</em></a>            <i class="line-gradient"></i>            ');}aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="comment"><i class="icon-font icon-font-comment"></i><em class="num mct-d">');if(data.mblog.comments_count){aRet.push(''+(data.mblog.comments_count)+'');}else{aRet.push('评论');}aRet.push('</em></a>            <i class="line-gradient"></i>            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="like"><i class="icon icon-like');if(data.mblog.attitudes_status==1){aRet.push('d');}aRet.push('small"></i><em class="num mct-d">');if(data.mblog.attitudes_count){aRet.push(''+(data.mblog.attitudes_count)+'');}else{aRet.push('赞');}aRet.push('</em></a>        </footer>        ');}aRet.push('    ');}aRet.push('</div>');return aRet.join("");
}
});
define("tpl/common/feedPic", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (mblog) {
var aRet = [];if (!mblog|| typeof mblog!= "object" ) return "";if(mblog.thumbnail_pic){aRet.push('    ');if(mblog.pic_ids.length === 1){aRet.push('        <div class="media-pic">            <img data-src="'+(mblog.pics[0].url)+'"');if(mblog.pics[0].geo){aRet.push(' width="'+(mblog.pics[0].geo.width)+'" height="'+(mblog.pics[0].geo.height)+'"');}aRet.push(' data-node="pic" data-act-type="hover">        </div>    ');}else{aRet.push('    <div class="media-pic-list');if(mblog.pic_ids.length === 4){aRet.push(' type-scube');}aRet.push('">        <ul>            ');if(mblog.pics && mblog.pics.constructor === Array){with({i:0,l:mblog.pics.length,pic_index:0,pic:null}){for(i=l;i--;){pic_index=(l-i-1);pic=mblog.pics[pic_index];aRet.push('                <li><img data-src="'+(pic.url)+'" data-node="pic" data-act-type="hover"></li>            ');}}}aRet.push('        </ul>    </div>  ');}}return aRet.join("");
}
});
define("tpl/mod/module_comment", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title Comment评论 (mod module_comment)@category Module - 自定义模块@readme Comment评论 ---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="module module_comment"><div class="info-bar"><div class="layout-box"><div class="box-col"><span class="info-txt mct-d">'+(data.forward_count||"")+'转发</span><span class="line-right"></span><span class="info-txt mct-a">'+(data.comment_count||"")+'评论<span class="arrow-up line-top"><em class="arrow-up-in line-left"></em></span></span></div><div class="plus"><span class="info-txt mct-d" action-type="like">'+(data.like_count||"")+'赞</span></div></div></div><div class="line-around comment-box">');if(data.comment_list.length){aRet.push('<ul class="comment-list line-top">');if(data.comment_list && data.comment_list.constructor === Array){with({i:0,l:data.comment_list.length,comment_index:0,comment:null}){for(i=l;i--;){comment_index=(l-i-1);comment=data.comment_list[comment_index];aRet.push('<li class="layout-box media-graphic line-bottom">             <div class="mod-media size-xs">                <div class="media-main"><img src="'+(comment.user.profile_image_url)+'" height="34" width="34"></div>');aRet.push((function(){var tpl = require("tpl/common/verified");return tpl(comment.user);})());aRet.push('            </div>            <div class="box-col item-list">                <div class="item-main txt-xs mct-a txt-cut">'+(comment.user.screen_name)+'</div>                <div class="item-minor txt-xs">                '+(comment.content)+'                </div>                <div class="item-other txt-xxs mct-d txt-cut"><span class="time">'+(comment.time)+'</span><span class="from">来自'+(comment.from)+'</span></div>                        </div>            <span class="operate-box">            <em class="line-around btn-more mct-d"><span class="icon-font icon-font-dots"></span></em>            </span>        </li>');}}}aRet.push('</ul>');}else{aRet.push('<div class="zero-box line-top"><i class="icon-font icon-font-comment"></i><p class="mct-d txt-s">还没有人评论</p></div>');}aRet.push('</div></div>');return aRet.join("");
}
});