angular.module('armyBuilder', ['phonecatFilters', 'armyBuilderServices']).
    config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/units', {templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl'}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: 'UnitCreationCtrl'}).
            when('/units/:unitId/:unitSlug', {templateUrl: 'partials/unit-detail.html', controller: 'UnitDetailCtrl'}).
            when('/weapons', {templateUrl: 'partials/weapons.html', controller: 'WeaponCtrl'}).
            otherwise({redirectTo: '/'});

        //TODO: Esto necesita un rewrite de URLs en el servidor > http://docs.angularjs.org/guide/dev_guide.services.$location (Server side)
        //$locationProvider.html5Mode(true);
    }]);




