angular.module('armyBuilder')

    .directive('editableGrid', function() {

        return {
            restrict: 'E',
            scope: {
                data: '=data'
            },
            templateUrl: 'partials/widgets/editable-grid.html'
        }

    });