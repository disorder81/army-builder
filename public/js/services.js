angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    });
/*angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
        return $resource('/api/units', {}, {
            query: {method:'GET', isArray:true}
        });
    });  */
