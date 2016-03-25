'use strict';
angular.module('concentrator.auth', [])
.provider('auth', [function(){
    this.$get = function(){

    }
}])
.service('auth', ['$http', '$log', '$cookies', '$rootScope', authProvider]);

function authProvider($http, $log, $cookies, $rootScope){
    this.doAuth = function doAuthF(username, password){
        function cb_success (response){
            $log.info("authentication: " +response.status + "\t"+ response.statusText);
        }

        function cb_failure (response){
            $log.info("authentication: " + response.status + "\t" + response.statusText);
        }

        $http.defaults.headers.common.username = username;
        $http.defaults.headers.common.password= password;
        $http.defaults.headers.common.remember= true;
        var temp = $http.post('/auth/auth', '' ).then(cb_success, cb_failure);
    };

    this.reauth = function reauthF(){
        function cb_success (response){
            $log.info("reAuth: " + response.statusText);
        }
        function cb_failure (response){
            $log.info("reAuth: " + response.statusText + "\t" + response.status);
        }
        $http.get('/auth/reauth', config).then(cb_success, cb_failure);
    };
};


