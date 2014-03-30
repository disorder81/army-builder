// ngRoute
/*angular.module('armyBuilder', ['armyBuilderServices', 'ngRoute', 'ngCkeditor', 'ngSanitize', 'ngAnimate']).
    config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/armies/:armyId/:armySlug', {templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl'}).
            when('/units', {templateUrl: 'partials/units.html', controller: 'UnitListCtrl'}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: 'UnitCtrl'}).
            when('/units/:unitId/:unitSlug', {templateUrl: 'partials/unit-detail.html', controller: 'UnitCtrl'}).
            when('/weapons', {templateUrl: 'partials/weapons.html', controller: 'WeaponCtrl'}).
            when('/rules', {templateUrl: 'partials/rules.html', controller: 'RuleListCtrl'}).
            when('/rules/new', {templateUrl: 'partials/rule-creation.html', controller: 'RuleCreationCtrl'}).
            when('/rules/:ruleId/:ruleSlug', {templateUrl: 'partials/rule-detail.html', controller: 'RuleCtrl'}).
            otherwise({redirectTo: '/'});

        //TODO: Esto necesita un rewrite de URLs en el servidor > http://docs.angularjs.org/guide/dev_guide.services.$location (Server side)
        //$locationProvider.html5Mode(true);
    }])*/

// ui-router
angular.module('armyBuilder', ['armyBuilderServices', 'ui.router', 'ngCkeditor', 'ngSanitize', 'ngAnimate']).
    config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
//            .state('army', {
//                url: '/armies/:armyId',
//                templateUrl: "partials/army-detail.html",
//                controller: 'ArmyCtrl'
//            })

            .state('home', { url: '/', templateUrl: 'partials/main.html' })
            .state('army', {
                url: '/armies/:armyId',
                templateUrl: 'partials/army.html',
                controller: 'ArmyCtrl',
                resolve: {
                    army: function($stateParams, ArmyService) {
                        return ArmyService.getArmy($stateParams.armyId);
                    }
                }})

            .state('army.units', {
                /*abstract: true,*/
                url: '/units',
                templateUrl: 'partials/army-detail.html',
                controller: function($state, army) {
                    $state.go('army.units.detail', {unitId: army.units[0]._id.$oid});
                }
            })

            .state('army.units.detail', {
                url: '/{unitId:[0-9a-fA-F]{24}}',
                templateUrl: 'partials/unit.html',
                controller: 'UnitCtrl',
                resolve: {
                    unit: function($stateParams, army, UnitService) {
                        return UnitService.getById($stateParams.unitId);
                    }
                },
                onEnter: function(army, $stateParams) {
                    _(army.units).each(function(unit) {
                        unit.selected = unit._id.$oid == $stateParams.unitId;
                    });
                }
            })

            .state('army.units.new', {
                url: '/new',
                templateUrl: 'partials/unit-creation.html',
                controller: 'UnitCreationCtrl'
            })


            //.state('army.unit', { url: '/units/:unitId', templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl' })
            /*.state('army.units', { url: '/units', templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl' })
            .state('army.units.unit', { url: '/:unitId', templateUrl: 'partials/unit.html', controller: 'ArmyCtrl' })
            .state('rule', { url: '/rules/:ruleId', templateUrl: 'partials/rule-detail.html', controller: 'RuleCtrl' }) */
        /*$routeProvider.
            when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/armies/:armyId/:armySlug', {templateUrl: 'partials/army-detail.html', controller: 'ArmyCtrl'}).
            when('/units', {templateUrl: 'partials/units.html', controller: 'UnitListCtrl'}).
            when('/units/new', {templateUrl: 'partials/unit-creation.html', controller: 'UnitCtrl'}).
            when('/units/:unitId/:unitSlug', {templateUrl: 'partials/unit-detail.html', controller: 'UnitCtrl'}).
            when('/weapons', {templateUrl: 'partials/weapons.html', controller: 'WeaponCtrl'}).
            when('/rules', {templateUrl: 'partials/rules.html', controller: 'RuleListCtrl'}).
            when('/rules/new', {templateUrl: 'partials/rule-creation.html', controller: 'RuleCreationCtrl'}).
            when('/rules/:ruleId/:ruleSlug', {templateUrl: 'partials/rule-detail.html', controller: 'RuleCtrl'}).
            otherwise({redirectTo: '/'});*/
    }])

    .value('ckEditorConfig', {
        language: 'es',
        toolbar_full: [
            { name: 'basicstyles',
                items: [ 'Bold', 'Italic'] },
            { name: 'paragraph', items: [ 'BulletedList', 'NumberedList'] },
            { name: 'links', items: [ 'Link', 'Unlink'] },
            { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
            //'/',
            { name: 'styles', items: [ 'PasteText', 'Format', 'RemoveFormat' ] },
            { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
            { name: 'document', items: [ 'PageBreak', 'Source' ] }
        ],
        format_tags: 'h1;h2;h3;p'
    });




