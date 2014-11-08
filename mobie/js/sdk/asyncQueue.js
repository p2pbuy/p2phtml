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
