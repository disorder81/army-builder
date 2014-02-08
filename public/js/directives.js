angular.module('armyBuilder')

    .directive('editableGrid', function() {

        return {
            restrict: 'E',
            scope: {
                data: '=data'
            },
            templateUrl: 'partials/widgets/editable-grid.html'
        }

    })

    // TODO: directiva listas editables
    .directive('list', function() {

        return {
            restrict: 'E',
            scope: {
                data: '=data'
            },
            templateUrl: 'partials/widgets/list.html'
        }

    })

    .directive('unitForm', function() {

        return {
            restrict: 'E',
            //scope: {
                // la variable dentro de la directiva y la del scope se llaman igual
                //unit: '='
            //},
            templateUrl: 'partials/unit-form.html'
        }

    });