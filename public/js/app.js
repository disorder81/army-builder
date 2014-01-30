angular.module('armyBuilder', ['phonecatFilters', 'armyBuilderServices', 'ngRoute']).
    config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/units', {templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl'}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: 'UnitCtrl'}).
            when('/units/:unitId/:unitSlug', {templateUrl: 'partials/unit-detail.html', controller: 'UnitCtrl'}).
            when('/weapons', {templateUrl: 'partials/weapons.html', controller: 'WeaponCtrl'}).
            when('/rules', {templateUrl: 'partials/rules.html', controller: 'RuleCtrl'}).
            when('/rules/new', {templateUrl: 'partials/rule-creation.html', controller: 'RuleCreationCtrl'}).
            when('/rules/:ruleId/:ruleSlug', {templateUrl: 'partials/rule-detail.html', controller: 'RuleCtrl'}).
            otherwise({redirectTo: '/'});

        //TODO: Esto necesita un rewrite de URLs en el servidor > http://docs.angularjs.org/guide/dev_guide.services.$location (Server side)
        //$locationProvider.html5Mode(true);
    }]);




