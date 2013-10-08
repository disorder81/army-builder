angular.module('armyBuilderServices', ['ngResource']).
    factory('Unit', function($resource){
        return $resource('/api/units/:unitId',
            { unitId: '@unitId'}, {
            query: {method: 'GET', isArray: true}
        });
    });

