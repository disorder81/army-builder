angular.module('armyBuilderServices', ['ngResource']).

    factory('Rule', function($resource) {
        return $resource('/api/rules/:ruleId',
            {ruleId: '@_id'}, {
            query: {method: 'GET', isArray: true},
            update: {method: 'PUT'}
        });
    })

    .factory('Unit', function($resource){
        return $resource('/api/units/:unitId',
            {unitId: '@_id'}, {
            query: {method: 'GET', isArray: true},
            update: {method: 'PUT'}
        });
    })

    .factory('Weapon', function($resource) {
        return $resource('/api/weapons/:weaponId',
            {weaponId: '@_id'}, {
                query: {method: 'GET', isArray: true},
                update: {method: 'PUT'}
            });
    })


    .factory('CoreService', function() {

        return {
            types: [
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
                    {value: "hover", name: "Gravítico"}]}],

            sections: [
                {value: "hq", name: "CG"},
                {value: "elite", name: "Elite"},
                {value: "line", name: "Tropas de línea"},
                {value: "designated-transport", name: "Transportes asignados"},
                {value: "fast-attack", name: "Ataque rápido"},
                {value: "heavy-support", name: "Apoyo pesado"}]

        }
    });

