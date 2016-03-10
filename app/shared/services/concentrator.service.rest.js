'use strict';
angular.module('concentrator.services.rest', [])

.service('productRestDAO', ['$http', '$log', '$q', productAPI]);

function productAPI(http, log, $q) {
    this.id = 1;
    

    this.list = function() {
        var defer = $q.defer();
        var promise = defer.promise
        http.get('REST/product' )
        .then(function success(response){
            return defer.resolve(response.data);
        }, function failure(response){
            defer.reject(response.data);
        });
        return promise;
    };
}