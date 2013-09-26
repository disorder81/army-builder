angular.module('army-builder', ['phonecatFilters', 'armyBuilderServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/units', {templateUrl: 'partials/unit-list.html', controller: UnitListCtrl}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: UnitCreationCtrl}).
            when('/units/:unitId', {templateUrl: 'partials/unit-detail.html', controller: UnitDetailCtrl}).
            otherwise({redirectTo: '/units'});
    }]);

