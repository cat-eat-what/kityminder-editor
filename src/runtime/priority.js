define(function(require, exports, module){

    function PriorityRuntime() {
        var minder = this.minder;
        var hotbox = this.hotbox;

        var main = hotbox.state('main');

        var buttonsLabel = {
            'zh-CN': {
                'priority': '优先级',
                'remove': '移除',
                'back': '返回'
            },
            'en': {
                'priority': 'Priority',
                'remove': 'Remove',
                'back': 'Back'
            }
        };
        var lang = window.DEFAULTLANG || localStorage['DEFAULTLANG'] || 'zh-CN';

        main.button({
            position: 'top',
            label: buttonsLabel[lang].priority,
            key: 'P',
            next: 'priority',
            enable: function() {
                return minder.queryCommandState('priority') != -1;
            }
        });

        var priority = hotbox.state('priority');
        '123456789'.replace(/./g, function(p) {
            priority.button({
                position: 'ring',
                label: 'P' + p,
                key: p,
                action: function() {
                    minder.execCommand('Priority', p);
                }
            });
        });

        priority.button({
            position: 'center',
            label: buttonsLabel[lang].remove,
            key: 'Del',
            action: function() {
                minder.execCommand('Priority', 0);
            }
        });

        priority.button({
            position: 'top',
            label: buttonsLabel[lang].back,
            key: 'esc',
            next: 'back'
        });

    }

    return module.exports = PriorityRuntime;

});