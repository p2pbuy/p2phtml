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
