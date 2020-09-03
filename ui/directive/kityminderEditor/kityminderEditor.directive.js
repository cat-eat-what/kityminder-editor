angular.module('kityminderEditor')
	.directive('kityminderEditor', ['config', 'minder.service', 'revokeDialog', function(config, minderService, revokeDialog) {
		return {
			restrict: 'EA',
			templateUrl: 'ui/directive/kityminderEditor/kityminderEditor.html',
			replace: true,
			scope: {
				onInit: '&'
			},
			link: function(scope, element, attributes) {

				var $minderEditor = element.children('.minder-editor')[0];

				function onInit(editor, minder) {
					if (attributes.onInit.indexOf('(') > 0) {
						scope.onInit({
							editor: editor,
							minder: minder
						});
					} else {
						var onInitFunc = scope.$parent.$eval(attributes.onInit);
						onInitFunc(editor, minder);
					}

					minderService.executeCallback();
				}

				if (typeof(seajs) != 'undefined') {
					/* global seajs */
					seajs.config({
						base: './src'
					});

					var id = 'd' + String(new Date().getTime())

					define(id, function(require) {
						var Editor = require('editor');

						var editor = window.editor = new Editor($minderEditor);

						if (window.localStorage.__dev_minder_content) {
							editor.minder.importJson(JSON.parse(window.localStorage.__dev_minder_content));
						}

						editor.minder.on('contentchange', function() {
							window.localStorage.__dev_minder_content = JSON.stringify(editor.minder.exportJson());
						});

						window.minder = window.km = editor.minder;

						scope.editor = editor;
						scope.minder = minder;
                        scope.config = config.get();

                        //scope.minder.setDefaultOptions(scope.config);
						scope.$apply();

						onInit(editor, minder);
					});

					seajs.use(id);

				} else if (window.kityminder && window.kityminder.Editor) {
					var editor = new kityminder.Editor($minderEditor);

					window.editor = scope.editor = editor;
					window.minder = scope.minder = editor.minder;

                    scope.config = config.get();

                    //scope.minder.setDefaultOptions(config.getConfig());

                    onInit(editor, editor.minder);
                }

			}
		}
	}]);