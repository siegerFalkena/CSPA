'use strict';
angular.module('concentrator.auth', [
        'ui.router',
        'concentrator.shared.localization',
        'concentrator.component.navbar'
    ])
    .provider('auth', [function() {
        this.$get = function() {

        }
    }])
    .service('auth', ['$http', '$log', '$cookies', '$window', authProvider])
    .controller('loginCtrl', ['$scope', '$cookies', '$log', '$window', 'auth', 'l10n', loginCtrl]);

function authProvider($http, $log, $cookies, $window) {

    this.doAuth = function doAuthF(username, password, cb_result) {
        function cb_success(response) {
            $log.info("authentication: " + response.status + "\t" + response.statusText);
            cb_result(true);
        }

        function cb_failure(response) {
            $log.info("authentication: " + response.status + "\t" + response.statusText);
            cb_result(false);
        }

        $http.defaults.headers.common.username = username;
        $http.defaults.headers.common.password = password;
        $http.defaults.headers.common.remember = true;
        var temp = $http.post('/auth/auth', '').then(cb_success, cb_failure);
        return temp;
    };

    this.reauth = function reauthF() {
        function cb_success(response) {
            $log.info("reAuth: " + response.statusText);
        }

        function cb_failure(response) {
            $log.info("reAuth: " + response.statusText + "\t" + response.status);
        }
        $http.get('/auth/reauth', config).then(cb_success, cb_failure);
    };

    this.isAuthed = function isAuthed() {
        var authToken = $cookies.get('authToken');
        var user = $cookies.get('user');
        var role = $cookies.get('role');
        if (authToken == undefined || user == undefined || role == undefined) {
            return false;
        } else {
            return true
        }
    };

    this.logout = function logout() {
        $cookies.remove("user");
        $cookies.remove("role");
        $cookies.remove("authToken");
        $window.location.href = "/"
    };

};

function loginCtrl($scope, $cookies, $log, $window, auth, l10n) {

    $scope.client = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/img/circle_gradient.png'
    };

    $scope.brand = {
        name: 'Concentrator',
        url: '/',
        imgSrc: 'assets/img/diract_logo.png'
    };

    $scope.scope = function() {
        $log.info($scope);
    }

    $scope.login = function() {
        function cb_result(b_success) {
            $window.location.href = "/"
        };
        var temp = auth.doAuth($scope.username, $scope.password, cb_result);
    };

    $scope.messages = []

    $scope.tempmsg = {
        "class": "list-group-item-danger",
        "info": "good info, just debug"
    };

    $scope.l10n = l10n.init($scope, function() {});
    $log.info($scope);
}
