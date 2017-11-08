angular.module('kityminderEditor')
	.provider('config',  function() {

		var cookieFunc = {
	    	setCookie: function(c_name,value,expiredays){
	    		var exdate = new Date()
	    		exdate.setDate(exdate.getDate()+expiredays)
	    		document.cookie = c_name+ "=" +escape(value)+
	    		((expiredays == null) ? "" : ";expires="+exdate.toGMTString())
	    	},
	    	getCookie: function getCookie(c_name){
	    		if (document.cookie.length>0){
	    		    var c_start = document.cookie.indexOf(c_name + "=")
	    		    if (c_start != -1){ 
	    		        c_start = c_start + c_name.length + 1;
	    		        var c_end = document.cookie.indexOf(";", c_start)
	    		        if (c_end == -1){
	    		    	    c_end = document.cookie.length
	    		        }
	    		        return unescape(document.cookie.substring(c_start,c_end))
	    		    } 
	    	    }
	    		return null
	    	}
	    }

		this.config = {
			// 右侧面板最小宽度
			ctrlPanelMin: 250,

			// 右侧面板宽度
			ctrlPanelWidth: parseInt(window.localStorage.__dev_minder_ctrlPanelWidth) || 250,

			// 分割线宽度
			dividerWidth: 3,

			// 默认语言
			defaultLang: window.DEFAULTLANG || localStorage['DEFAULTLANG'] || 'zh-CN',

			// 放大缩小比例
			zoom: [10, 20, 30, 50, 80, 100, 120, 150, 200],

            // 图片上传接口
            imageUpload: 'server/imageUpload.php'
		};

		this.set = function(key, value) {
            var supported = Object.keys(this.config);
            var configObj = {};

            // 支持全配置

            if (typeof key === 'object') {
                configObj = key;
            }
            else {
                configObj[key] = value;
            }
            if(key=="defaultLang"){
            	if(this.config["defaultLang"]!=value){
            		cookieFunc.setCookie('DEFAULTLANG', value);
            		window.location.reload();
            	}
            }
            for (var i in configObj) {
                if (configObj.hasOwnProperty(i) && supported.indexOf(i) !== -1) {
                    this.config[i] = configObj[i];
                }
                else {
                    console.error('Unsupported config key: ', key, ', please choose in :', supported.join(', '));
                    return false;
                }
            }
            return true;
		};

		this.$get = function () {
			var me = this;

			return {
				get: function (key) {
                    if (arguments.length === 0) {
                        return me.config;
                    }

					if (me.config.hasOwnProperty(key)) {
						return me.config[key];
					}

					console.warn('Missing config key pair for : ', key);
					return '';
				}

			};
		}
		window.minderConfig = this;
	});