
angular.module('armyBuilder')

    .controller('MainCtrl', function($scope, Army, ArmyService) {

        ArmyService.selectedArmy = {};

        $scope.armies = Army.query();

        $scope.selectArmy = function(army) {
            ArmyService.selectedArmy = army;
        }
    })

    .controller('ArmyCtrl', function($scope, $location, $routeParams, Unit, UnitService, ArmyService){
        $scope.units = Unit.query({army: $routeParams.armyId, fields: 'name,cost'});

        $scope.viewUnit = function(unit) {
            $scope.selectedUnit = UnitService.getById(unit._id.$oid);
        }
    })

    .controller('RuleListCtrl', function($scope, $location, $routeParams, Rule, RuleService) {
        $scope.rules = Rule.query();
        $scope.newRule = function() {
            RuleService.reset();
            $location.path('/rules/new');
        }

        $scope.deleteRule = function(rule) {
            rule.$delete({ruleId: rule._id.$oid}, function(){console.log('ok');}, function(){console.log('ko');});
        }
    })

    .controller('RuleCtrl', function($scope, $location, $routeParams, Rule) {
        $scope.rule = Rule.get({ruleId: $routeParams.ruleId});

    })

    .controller('RuleCreationCtrl', function($scope, $location, Rule, CoreService, RuleService, ckEditorConfig) {

        var master = {
            name: 'nombre',
            description: 'descripcion'
        }

        $scope.cancel = function() {
            //$scope.rule = angular.copy(master);
            $scope.rule = RuleService.rule;
        }

        $scope.endEdition = function() {
            //console.log($scope.selectedUnit._id.$oid)
            RuleService.endEdition();
            $location.path('/units/' + $scope.selectedUnit._id.$oid + '/slug');
        }

        $scope.cancel();

        if(RuleService.getUnit()) {
            $scope.selectedUnit = RuleService.getUnit();
        }

        $scope.editorOptions = ckEditorConfig;

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
    })

    .controller('UnitListCtrl', function($scope, $location, $routeParams, UnitService) {
        $scope.units = UnitService.getAll();
        /*$scope.$watchCollection('units', function(){
            console.log('algo');
        });*/
        $scope.orderProp = 'name';

        $scope.newUnit = function() {
            $location.path('/units/new');
        }

        $scope.deleteUnit = function(unit) {
            UnitService.delete(unit);
        }

    })

    .controller('UnitCtrl', function($log, $scope, $q, $location, $routeParams, Unit, Rule, CoreService, ckEditorConfig, $filter, UnitService, RuleService) {

        $scope.sections = CoreService.sections;
        $scope.types = CoreService.types;
        $scope.editorOptions = ckEditorConfig;

        $scope.cancel = function() {
            $scope.unit = angular.copy(CoreService.unit);
        }

        $scope.cancel();

        if($routeParams.unitId) {
            $scope.unit = UnitService.getById($routeParams.unitId);
            $scope.unit.$promise.then(function(unit) {
                $log.info('cargado: ' + unit.name);

                $scope.rules = Rule.query();

                $scope.rules.$promise.then(function() {
                    angular.forEach($scope.unit.specialRules, function(rule) {
                        // TODO: Refactor

                        $filter('filter')($scope.rules, {'_id.$oid': rule._id.$oid}, true)[0].selected = true;
//
//                        // TODO: Filtro
//                        var r = $scope.rules;
//                        var i=0, len=r.length;
//
//                        for (; i<len; i++) {
//                            if (r[i]._id.$oid == rule._id.$oid) {
//                                console.log(angular.equals(rule, r[i]));
//                                r[i].selected = true;
//                            }
//                        }
                    });
                });
            })
        }

        $scope.save = function(unit) {
            var u = new Unit(unit);
            var p = UnitService.save(u);
            p.then(function (){
                $log.log('ok, volver a la lista');
                $location.path('/units');
            }, function() {
                $log.error('error');
            });
        }

        /*$scope.rules = Rule.query({}, function(){
            angular.forEach($scope.rules, function(rule) {
                console.log('mirar si están seleccionadas');
            });
        });*/

        $scope.createUnitRule = function() {
            var p = RuleService.createUnitRule($scope.unit);
            p.then(function(r) {
                $log.log(r);
                //$scope.unit.specialRulesOwn.push(r);
            });
            $location.path('/rules/new');
        }

        $scope.update = function(unit) {
            var p = UnitService.update(unit);
            p.then(function() {
                $log.log('ok, volver');
                $location.path('/units');
            }, function(reason) {
                $log.error('error: ' + reason)
            });
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
            // TODO: mirar el $digest, esta linea se ejecuta demasiado...
            $filter('filter')($scope.rules, {'_id.$oid': rule._id.$oid}, true)[0].selected = false;
            $scope.unit.specialRules.splice($scope.unit.specialRules.indexOf(rule), 1);

            // TODO: Filtro
            //var r = $scope.rules;
            //var i=0, len=r.length;

            /*for (; i<len; i++) {
                if (r[i]._id.$oid == rule._id.$oid) {
                    //console.log(angular.equals(rule, r[i]));
                    $scope.unit.specialRules.splice($scope.unit.specialRules.indexOf(rule), 1);
                    r[i].selected = false;
                    //return r[i];
                }
            }*/

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