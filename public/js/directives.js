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