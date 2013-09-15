function PhoneListCtrl($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
    //$http.get('/api/units').success(function(data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';
}

function PhoneDetailCtrl($scope, $routeParams, $http) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
        $scope.phone = data;
    });
}

//PhoneListCtrl.$inject = ['$scope', '$http'];
/*function PhoneListCtrl($scope) {
    $scope.phones = [
        {"name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S.",
            "age": 0},
        {"name": "Motorola XOOM™ with Wi-Fi",
            "snippet": "The Next, Next Generation tablet.",
            "age": 1},
        {"name": "MOTOROLA XOOM™",
            "snippet": "The Next, Next Generation tablet.",
            "age": 2}
    ];

    $scope.orderProp = 'age';

}          */
