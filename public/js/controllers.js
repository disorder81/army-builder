
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
            description: 'descripcion',
            type: 'hq',
            stats: {
                ws: 3,
                bs: 3,
                s: 3,
                t: 3,
                w: 3,
                i: 3,
                a: 3,
                ld: 3,
                sv: 3
            },
            wargear: [
                {id: 'id'}
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
            $scope.unit.wargear.push({id:'id'});
        }

        $scope.cancel = function() {
            $scope.unit = angular.copy(master);
        }

        $scope.cancel();
    });

