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

/* PATH: src/js/sdk/uniqueId.js */
define("sdk/uniqueId", function(require, exports, module) {

var uidNumber = 1;
var uidDateString = '_' + (+new Date) + '_';

module.exports = function(prefix) {
	return (prefix || '') + uidDateString + (uidNumber++);
};

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
