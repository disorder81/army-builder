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

    // TODO: directiva listas editables
    .directive('editable', function() {

        return {
            restrict: 'A',
            template: '<p>{{ army.name }}</p>',
            replace: true,
            link: function(scope, elem, attrs) {
                elem.on('click', function(e) {
                    // elem.addClass('ey');
                    console.log(elem);
                });
            }
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