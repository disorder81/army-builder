function UnitListCtrl($scope, $location, Unit) {
    $scope.units = Unit.query();
    $scope.orderProp = 'name';

    $scope.newUnit = function() {
        $location.path('/units/new');
    };
}

function UnitDetailCtrl($scope, $routeParams, Unit) {
    $scope.unit = Unit.get({unitId: $routeParams.unitId}, function(unit) {
        $scope.mainImageUrl = unit.images[0];

        $scope.edit = function() {
            console.log('edit');
        };

        $scope.delete = function() {
            console.log('delete');
        };


    });
}

function UnitCreationCtrl($scope, Unit) {

}


