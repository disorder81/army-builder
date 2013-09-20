angular.module('army-builder', ['phonecatFilters', 'armyBuilderServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/units', {templateUrl: 'partials/unit-list.html', controller: UnitListCtrl}).
            when('/units/:unitId', {templateUrl: 'partials/unit-detail.html', controller: UnitDetailCtrl}).
            otherwise({redirectTo: '/units'});
    }]);

