
angular.module('armyBuilder')

    .controller('ArmyCtrl', function($scope, $location, Unit){
        $scope.units = Unit.query();
        $scope.orderProp = 'name';

        $scope.newUnit = function() {
            $location.path('/units/new');
        }
    })

    .controller('UnitDetailCtrl', function($scope, $routeParams, Unit) {
         $scope.unit = Unit.get({unitId: $routeParams.unitId}, function(unit) {

         });
    })

    .controller('UnitCreationCtrl', function($scope, $location, Unit) {

        var master = {
            name: 'nombre',
            cost: 0,
            description: 'adasdasdd',
            cosas: [
                {tipo: 'tipo', valor: 'valor'}
            ]
        }

        $scope.save = function(unit) {
            var u = new Unit(unit);
            u.$save([],
                function() {
                    console.log('ok');
                    $location.path('/');
                },
                function(){
                    console.log('ko');
                }
            );
        }

        $scope.add = function() {
            $scope.unit.cosas.push({tipo:'', valor: ''});
        }

        $scope.cancel = function() {
            $scope.unit = angular.copy(master);
        }

        $scope.cancel();
    });

