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
