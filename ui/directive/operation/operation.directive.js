angular.module('kityminderEditor')
    .directive('operation', function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/operation/operation.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function($scope) {
                var myBrowser = function(){
                    var userAgent = navigator.userAgent;
                    var isOpera = userAgent.indexOf("Opera") > -1;
                    if (isOpera) {
                        return "Opera"
                    }; 
                    if (userAgent.indexOf("Firefox") > -1) {
                        return "FF";
                    }
                    if (userAgent.indexOf("Chrome") > -1){
                        return "Chrome";
                    }
                    if (userAgent.indexOf("Safari") > -1) {
                        return "Safari";
                    }
                    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                        return "IE";
                    }; //判断是否IE浏览器
                };
                $scope.editNode = function() {

                    var receiverElement = editor.receiver.element;
                    var fsm = editor.fsm;
                    var receiver = editor.receiver;

                    receiverElement.innerText = minder.queryCommandValue('text');
                    fsm.jump('input', 'input-request');
                    receiver.selectAll();

                }
                $scope.importnode = function() {
                    //$(".operation-group #files").click();
                    if(minder.importNode){
                        minder.importNode();
                    }
                }
                $scope.exportnode = function() {
                    var _data = JSON.stringify(minder.exportJson());
                    if(myBrowser()=="FF"||myBrowser()=="Chrome"){
                        var file = new File([_data], "data.json", { type: "application/json;charset=utf-8" });
                    }else{
                        var file = new Blob([_data], {type : 'application/json;charset=utf-8'})
                    }
                    saveAs(file, "data.json");
                }
                window.minderImportData = function() {
                    var selectedFile = document.getElementById("files").files[0];
                    var name = selectedFile.name;
                    var size = selectedFile.size;
                    var reader = new FileReader();
                    reader.readAsText(selectedFile);
                    reader.onload = function(){
                        try {
                            minder.importJson(JSON.parse(this.result));
                    　　 } catch(error) {
                            console.error(error);
                    　　 } finally {
                    　　 } 
                    };
                }

            }
        }
    });