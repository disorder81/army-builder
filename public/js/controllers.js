
angular.module('armyBuilder')

    .controller('MainCtrl', function($scope) {

    })

    .controller('RuleCtrl', function($scope, $location, $routeParams, Rule) {

        // TODO: Esto tiene que ir en otro lado que si no se carga cada vez
        $scope.rules = Rule.query();

        //$scope.rule = Rule.get({ruleId: $routeParams.ruleId});

        $scope.newRule = function() {
            $location.path('/rules/new');
        }

        $scope.deleteRule = function(rule) {
            //Unit.delete({id: unit._id.$oid});
            rule.$delete({ruleId: rule._id.$oid}, function(){console.log('ok');}, function(){console.log('ko');});
            console.log(rule._id.$oid);
        }
    })

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

    .controller('RuleCreationCtrl', function($scope, $location, Rule, CoreService, ckEditorConfig) {

        $scope.editorOptions = ckEditorConfig;

        var master = {
            name: 'nombre',
            description: 'descripcion'
        }

        $scope.save = function(rule) {
            var r = new Rule(rule);
            r.$save([],
                function() {
                    console.log('ok');
                    $location.path('/rules');
                },
                function(){
                    console.log('ko');
                }
            );
        }

        $scope.cancel = function() {
            $scope.rule = angular.copy(master);
        }

        $scope.cancel();
    })

    .controller('UnitCtrl', function($scope, $location, $routeParams, Unit, Rule, CoreService, ckEditorConfig) {

        $scope.sections = CoreService.sections;
        $scope.types = CoreService.types;
        $scope.editorOptions = ckEditorConfig;

        $scope.cancel = function() {
            $scope.unit = angular.copy(master);
        }

        $scope.cancel();

        if($routeParams.unitId) {
            $scope.unit = Unit.get({unitId: $routeParams.unitId});
            $scope.unit.$promise.then(function(unit) {
                console.log('cargado: ' + unit.name);
                $scope.rules = Rule.query();
                $scope.rules.$promise.then(function() {
                    angular.forEach($scope.unit.specialRules, function(rule) {
                        // TODO: Refactor
                        // TODO: Filtro
                        var r = $scope.rules;
                        var i=0, len=r.length;

                        for (; i<len; i++) {
                            if (r[i]._id.$oid == rule._id.$oid) {
                                console.log(angular.equals(rule, r[i]));
                                r[i].selected = true;
                            }
                        }
                    });
                });
            })
        }

//        if($routeParams.unitId) {
//            $scope.unit = Unit.get({unitId: $routeParams.unitId});
//            /*$scope.unit.$promise.then(function() {
//                console.log('cargada');
//            });  */
//        } else {
//            $scope.cancel();
//        }

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
                    $location.path('/units');
                },
                function(){
                    console.log('ko');
                }
            );
        }

        /*$scope.rules = Rule.query({}, function(){
            angular.forEach($scope.rules, function(rule) {
                console.log('mirar si están seleccionadas');
            });
        });*/

        //$scope.rules = Rule.query();


        $scope.update = function(unit) {
            unit.$update({unitId: unit._id.$oid});
            // TODO: OK / KO
            $location.path('/');
        }

        $scope.addWargear = function() {
            $scope.unit.wargear.push({id:'id'});
        }

        $scope.removeWargear = function(index) {
            $scope.unit.wargear.splice(index, 1);
        }

        $scope.addSpecialRule = function(rule) {
            $scope.unit.specialRules.push(rule);
            rule.selected = true;
        }

        $scope.ruleNotSelected = function(rule) {
            return typeof(rule.selected) === 'undefined' || rule.selected === false;
        }

        $scope.removeSpecialRule = function(rule) {
            // TODO: Refactor
            // TODO: Filtro
            var r = $scope.rules;
            var i=0, len=r.length;

            for (; i<len; i++) {
                if (r[i]._id.$oid == rule._id.$oid) {
                    //console.log(angular.equals(rule, r[i]));
                    $scope.unit.specialRules.splice($scope.unit.specialRules.indexOf(rule), 1);
                    r[i].selected = false;
                    //return r[i];
                }
            }

//            var index = $scope.unit.specialRules.indexOf(rule);
//            if (index != -1) {
//                $scope.unit.specialRules.splice(index, 1);
//            }
//
//            rule.selected = false;
        }



        $scope.$watch('unit.type', function(){
            //$scope.unit.stats = {};
        });

    })

    .controller('WeaponCtrl', function($scope, $location, Weapon){
        $scope.weapons = Weapon.query();
    });