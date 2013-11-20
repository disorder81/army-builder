
angular.module('armyBuilder')

    .controller('ArmyCtrl', function($scope, $location, $routeParams, Unit){
        $scope.units = Unit.query();
        $scope.orderProp = 'name';

        $scope.newUnit = function() {
            $location.path('/units/new');
        }

        $scope.deleteUnit = function(unit) {
            //Unit.delete({id: unit._id.$oid});
            unit.$delete({unitId: unit._id.$oid}, function(){console.log('ok');}, function(){console.log('ko');});
            console.log(unit._id.$oid);
        }
    })

    .controller('UnitDetailCtrl', function($scope, $routeParams, Unit) {
         $scope.unit = Unit.get({unitId: $routeParams.unitId}, function(unit) {

         });
    })

    .controller('UnitCreationCtrl', function($scope, $location, Unit, CoreService) {

        $scope.sections = CoreService.sections;
        $scope.types = CoreService.types;

        var master = {
            name: 'nombre',
            cost: 0,
            description: 'descripcion',
            section: $scope.sections[0].value,
            type: $scope.types[0].value,
            subtypes: [],
            unique: false,
            composition: {
                min: 1,
                max: 3
            },
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
            ],
            specialRules: [],
            options: []

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

        $scope.$watch('unit.type', function(){
            $scope.unit.stats = {};
        });

        $scope.cancel();
    })

    .controller('WeaponCtrl', function($scope, $location, Weapon){
        $scope.weapons = Weapon.query();
    });