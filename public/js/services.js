angular.module('armyBuilderServices', ['ngResource']).
    factory('Unit', function($resource){
        return $resource('/api/units/:unitId',
            {unitId: '@_id'}, {
            query: {method: 'GET', isArray: true},
            update: {method: 'PUT'}
        });
    });

