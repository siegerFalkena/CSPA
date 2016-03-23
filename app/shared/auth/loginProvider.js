'use strict';
angular.module('concentrator.auth', [])
.provider('auth', [function(){
    this.$get = function(){

    }
}])
.run()
.service('auth', ['$http', '$log', authProvider]);

function authProvider($http, $log){
    this.doAuth = function doAuthF(username, password){
        function cb_success (response){
            $log.info("doAuth: " + response.statusText);
            
        }
        function cb_failure (response){
            $log.info("doAuth: " + response.statusText + "\t" + response.status);
        }

        
        var temp = $http.post('/AUTH', '' ).then(cb_success, cb_failure);
    };

    this.getSession = function getSessionF(){
        function cb_success (response){
            $log.info("doAuth: " + response.statusText);
        }
        function cb_failure (response){
            $log.info("doAuth: " + response.statusText + "\t" + response.status);
        }
        $http.get('/session', config).then(cb_success, cb_failure);
    };
};


