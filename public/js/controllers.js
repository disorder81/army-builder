
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

        /*<option value="ar">Artillería</option>
        <option value="be">Bestia</option>
        <option value="mo">Moto</option>
        <option value="cb">Caballería</option>
        <option value="mre">Moto a reacción Eldar</option>
        <option value="cm">Criatura monstruosa</option>
        <option value="cmv">Criatura monstruosa voladora</option>
        <option value="in">Infantería</option>
        <option value="ur">Unidad a reacción</option>
        <option value="mr">Moto a reacción</option>
        <option value="sa">Unidad de salto</option>
        <option value="pj">Personaje</option>
        <option value="vehicle">Vehículo</option> */

        // TODO: Core
        $scope.types = [
            {key: "ar", name: "Artilleria"},
            {key: "be", name: "Bestia"},
            {key: "mo", name: "Moto"},
            {key: "cb", name: "Caballería"},
            {key: "mre", name: "Moto a reacción Eldar"},
            {key: "cm", name: "Criatura monstruosa"},
            {key: "cmv", name: "Criatura monstruosa voladora"},
            {key: "in", name: "Infantería"},
            {key: "ur", name: "Unidad a reacción"},
            {key: "mr", name: "Moto a reacción"},
            {key: "sa", name: "Unidad de salto"},
            {key: "pj", name: "Personaje"},
            {key: "vehicle", name: "Vehicle"}];

        /*<input type="radio" name="seccion" value="hq" ng-model="unit.section">CG</input>
        <input type="radio" name="seccion" value="elite" ng-model="unit.section">Elite</input>
        <input type="radio" name="seccion" value="line" ng-model="unit.section">Tropas de línea</input>
        <input type="radio" name="seccion" value="designated-transport" ng-model="unit.section">Transportes asignados</input>
        <input type="radio" name="seccion" value="fast-attack" ng-model="unit.section">Ataque rápido</input>
        <input type="radio" name="seccion" value="heavy-support" ng-model="unit.section">Apoyo pesado</input>*/

        $scope.sections = [
            {key: "hq", name: "CG"},
            {key: "elite", name: "Elite"},
            {key: "line", name: "Tropas de línea"},
            {key: "designated-transport", name: "Transportes asignados"},
            {key: "fast-attack", name: "Ataque rápido"},
            {key: "heavy-support", name: "Apoyo pesado"}];

        var master = {
            name: 'nombre',
            cost: 0,
            description: 'descripcion',
            section: 'hq',
            type: 'infantry',
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
            specialRules: []
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

