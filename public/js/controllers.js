
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

    .controller('UnitCreationCtrl', function($scope, $location, Unit) {

        // TODO: Core
        $scope.types = [
            {value: "troop", name: "Tropa", subtypes: [
                {value: "ar", name: "Artilleria"},
                {value: "be", name: "Bestia"},
                {value: "mo", name: "Moto"},
                {value: "cb", name: "Caballería"},
                {value: "mre", name: "Moto a reacción Eldar"},
                {value: "cm", name: "Criatura monstruosa"},
                {value: "cmv", name: "Criatura monstruosa voladora"},
                {value: "in", name: "Infantería"},
                {value: "ur", name: "Unidad a reacción"},
                {value: "mr", name: "Moto a reacción"},
                {value: "sa", name: "Unidad de salto"},
                {value: "pj", name: "Personaje"}]},
            {value: "vehicle", name: "Vehículo", subtypes: [
                {value: "walker", name: "Andador"},
                {value: "tank", name: "Tanque"},
                {value: "flyer", name: "Volador"},
                {value: "hover", name: "Gravítico"}]}];

        // TODO: Core
        $scope.sections = [
            {value: "hq", name: "CG"},
            {value: "elite", name: "Elite"},
            {value: "line", name: "Tropas de línea"},
            {value: "designated-transport", name: "Transportes asignados"},
            {value: "fast-attack", name: "Ataque rápido"},
            {value: "heavy-support", name: "Apoyo pesado"}];

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