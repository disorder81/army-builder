angular.module('armyBuilderServices', ['ngResource']).
    factory('Unit', function($resource){
        return $resource('/api/units/:unitId', {}, {
            query: {method: 'GET', isArray: true}
        });
    });

