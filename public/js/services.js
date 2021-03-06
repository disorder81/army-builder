angular.module('armyBuilderServices', ['ngResource']).

    factory('Army', function($resource) {
        return $resource('/api/armies/:armyId',
            {armyId: '@_id.$oid'}, {
                query: {method: 'GET', isArray: true, cache: true},
                update: {method: 'PUT'}
            });
    })

    .factory('Rule', function($resource) {
        return $resource('/api/rules/:ruleId',
            {ruleId: '@_id'}, {
            query: {method: 'GET', isArray: true},
            update: {method: 'PUT'}
        });
    })

    .factory('Unit', function($resource){

        // Función para permitir pasar la propiedad $oid en el JSON
        // Quita también también propiedades que Angular añade al objeto: $promise, etc.
        // TODO: Esto debería ir a una utils
        var transformData = function (data) {
            return JSON.stringify(data, function (key, value) {
                var val = value;

                if (/^\$+/.test(key) && key !== '$oid') {
                    val = undefined;
                }

                return val;
            });
        };

        return $resource(
            // URL contra la que va mapeado el recurso
            '/api/units/:unitId',
            // Valor de los parámetros
            // @ indica que tiene que buscar el valor en el objeto data,
            // que es el segundo parámetro con el que se llama la método -> Unit.update({}, data)
            {unitId: '@_id.$oid'},
            // Personalización del objeto actions
            {
                query: {
                    method: 'GET',
                    isArray: true},
                save: {
                    method: 'POST',
                    transformRequest: transformData
                },
                update: {
                    method: 'PUT',
                    //params: {unitId: '@_id.$oid'},
                    isArray: false,
                    transformRequest: transformData
                }
            });
    })

    .factory('Weapon', function($resource) {
        return $resource('/api/weapons/:weaponId',
            {weaponId: '@_id'}, {
                query: {method: 'GET', isArray: true},
                update: {method: 'PUT'}
            });
    })


    .service(
        'CoreService',
        function() {
            var types = [
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
                        {value: "pj", name: "Personaje"}
                    ]},
                    {value: "vehicle", name: "Vehículo", subtypes: [
                        {value: "walker", name: "Andador"},
                        {value: "tank", name: "Tanque"},
                        {value: "flyer", name: "Volador"},
                        {value: "hover", name: "Gravítico"}
                    ]}
                ],

                sections = [
                    {value: "hq", name: "CG"},
                    {value: "elite", name: "Elite"},
                    {value: "line", name: "Tropas de línea"},
                    {value: "designated-transport", name: "Transportes asignados"},
                    {value: "fast-attack", name: "Ataque rápido"},
                    {value: "heavy-support", name: "Apoyo pesado"}
                ],

                unit = {
                    name: 'Nombre',
                    army: {},
                    cost: 0,
                    description: '<p>Descripcion!</p>',
                    section: sections[0].value,
                    type: types[0].value,
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
                    wargear: [],
                    specialRules: [],
                    options: []
                },

                rule = {
                    types: ['universal', 'army', 'faction', 'unit']
                };

            return {
                types: types,
                sections: sections,
                unit: unit
            }
    })

    .service('ArmyService', function($q, $log, Army, Unit) {

        var
            armies = [],
            selectedArmy = {}

        return {
            armies: armies,
            selectedArmy: selectedArmy,

            getArmies: function() {
//                if(armies.length > 0) {
//                    return armies;
//                }

                var deferred = $q.defer();
                var army = Army.query();

                $q.all([army.$promise])
                    .then(function(data) {
                        armies = data[0];
                        deferred.resolve(armies);
                    }.bind(this)
                );

                return deferred.promise;
            },

            save: function(army) {
                var p = army.$save();
                p.then(function(data) {
                    armies.push(data);
                });
            },

            delete: function(army) {
//                console.log(army);
                army.$delete({}, function() { armies.splice(armies.indexOf(army), 1);});

//                p.then(function() {
//                    $log.log('ok, sacar de la lista');
//                    armies.splice(armies.indexOf(army), 1);
//                }, function() {
//                    $log.error('error al borrar');
//                });
            },



//            getArmies: function() {
//                armies
//                //TODO: fields
//            },



            getArmy: function(id) {
                var deferred = $q.defer();

                var army = Army.get({armyId: id});
                // TODO: Se debe poder hacer en una query y pasar un objeto al constructor de Unit
                var units = Unit.query({army: id, fields: 'name,cost'});

                $q.all([army.$promise, units.$promise])
                    .then(function(data) {
                        data[0].units = data[1];
                        this.selectedArmy = data[0];

                        deferred.resolve(data[0]);
                    }.bind(this)
                );

                return deferred.promise;
            },

            removeUnit: function(unit) {
                var p = unit.$delete();
                p.then(function() {
                    $log.log('ok, sacar de la lista');
                    this.selectedArmy.units.splice(this.selectedArmy.units.indexOf(unit), 1);
                }.bind(this), function() {
                    $log.error('error al borrar');
                });
            }

        }

    })

    // TODO: Refactor
    .service('UnitService', function($log, Unit, CoreService, ArmyService) {

        var units = Unit.query({'fields': 'name,cost'}),
            unitCache = {};

        var reload = function() {
            var p = Unit.query();

            p.$promise.then(function(v) {
                angular.copy(v, units);
            }, function() {
                // TODO: Excepciones
                $log.error('error');
            });
        }

        return {

            create: function() {
                var unit = new Unit(angular.copy(CoreService.unit));
                unit.army = ArmyService.selectedArmy._id;
//                ArmyService.selectedArmy.units.push(unit);

                return unit;
            },

            getAll: function() {
                return units
            },

            getById: function(id) {
                if(!unitCache[id]) {
                    unitCache[id] = Unit.get({unitId: id});
                }

                return unitCache[id];
            },

            save: function(unit) {
                //var u = new Unit(unit);


                var p = unit.$save();
                p.then(function(data){
                    console.log(data);
                    //$log.info(ArmyService.selectedArmy.units.push(new Unit(data)));
                    $log.info('guardado ok, recargar lista');
                    //reload();
                }, function() {
                    $log.error('error guardando');
                });

                return p;
            },

            update: function(unit) {
                // Parámetros: non-GET instance actions: instance.$action([parameters], [success], [error])
                // http://docs.angularjs.org/api/ngResource.$resource
                // De momento parámetros vacíos, el $resource saca el id del data
                var p = unit.$update();
                p.then(function() {
                    $log.log('ok, limpiar');
                    delete unitCache[unit._id.$oid];
                });

                return p;
            },

            delete: function(unit) {
                var p = unit.$delete();
                p.then(function() {
                    $log.log('ok, sacar de la lista');
                    units.splice(units.indexOf(unit), 1);
                }, function() {
                    $log.error('error al borrar');
                });
            }

        }
    })

    .service('RuleService', function($log, $q, Rule) {

        var rules = Rule.query(),
            unit,
            unitRulePromise,
            rule = {};

        return {

            rule: rule,

            getAll: function() {
                return rules;
            },

            getUnit: function() {
                return this.unit;
            },

            createUnitRule: function(unit) {
                this.unit = unit;
                this.rule = new Rule();
                unitRulePromise = $q.defer();
                return unitRulePromise.promise;
            },

            endEdition: function() {
                unitRulePromise.resolve({ _id: 'id', name: 'test'});
                this.unit.specialRules.individual.push(this.rule);
            },

            reset: function() {
                this.unit = undefined;
            }

        }

    });



