angular.module('armyBuilderServices', ['ngResource']).
    factory('Unit', function($resource){
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
    });

