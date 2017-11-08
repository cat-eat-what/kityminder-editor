angular.module('kityminderEditor')
    .directive('senior', function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/senior/senior.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function($scope) {
                $scope.dropDis = false;
                var $seniorDropMenu = $('.senior-drop-menu');
                $scope.showDrop = function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.dropDis = !$scope.dropDis;
                    if($scope.dropDis){
                        $seniorDropMenu.css("display", "block");
                    }else{
                        $seniorDropMenu.css("display", "none");
                    }
                }
                $scope.showDropMenu = function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.dropDis = true;
                    $seniorDropMenu.css("display", "block");
                }
                document.body.onclick=function(){ 
                    $scope.dropDis = false;
                    $seniorDropMenu.css("display", "none");
                }; 
            }
        }
    });