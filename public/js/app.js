angular.module('armyBuilder', ['phonecatFilters', 'armyBuilderServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/units', {templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl'}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: 'UnitCreationCtrl'}).
            when('/units/:unitId/:unitSlug', {templateUrl: 'partials/unit-detail.html', controller: 'UnitDetailCtrl'}).
            when('/weapons', {templateUrl: 'partials/weapons.html', controller: 'WeaponCtrl'}).
            otherwise({redirectTo: '/units'});
    }]);




