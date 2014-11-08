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