define(function(require, exports, module){

    function ProgressRuntime() {
        var minder = this.minder;
        var hotbox = this.hotbox;

        var main = hotbox.state('main');

        var buttonsLabel = {
            'zh-CN': {
                'progress': '进度',
                'remove': '移除',
                'back': '返回'
            },
            'en': {
                'progress': 'Progress',
                'remove': 'Remove',
                'back': 'Back'
            }
        };
        var lang = window.DEFAULTLANG || localStorage['DEFAULTLANG'] || 'zh-CN';

        main.button({
            position: 'top',
            label: buttonsLabel[lang].progress,
            key: 'G',
            next: 'progress',
            enable: function() {
                return minder.queryCommandState('progress') != -1;
            }
        });

        var progress = hotbox.state('progress');
        '012345678'.replace(/./g, function(p) {
            progress.button({
                position: 'ring',
                label: 'G' + p,
                key: p,
                action: function() {
                    minder.execCommand('Progress', parseInt(p) + 1);
                }
            });
        });

        progress.button({
            position: 'center',
            label: buttonsLabel[lang].remove,
            key: 'Del',
            action: function() {
                minder.execCommand('Progress', 0);
            }
        });

        progress.button({
            position: 'top',
            label: buttonsLabel[lang].back,
            key: 'esc',
            next: 'back'
        });


    }

    return module.exports = ProgressRuntime;

});