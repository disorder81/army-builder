function UnitListCtrl($scope, Unit) {
    $scope.units = Unit.query();
    $scope.orderProp = 'name';
}

function UnitDetailCtrl($scope, $routeParams, Unit) {
    $scope.unit = Unit.get({unitId: $routeParams.unitId}, function(unit) {
        $scope.mainImageUrl = unit.images[0];
    });
}


